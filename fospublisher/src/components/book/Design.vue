<template>
  <div>
    <navbar />
    <v-container fluid>
      <v-row style="height: 100vh">
        <v-col cols="6" class="d-flex align-center overflow-auto">
          <div class="container">
            <div
              class="img"
              :class="{
                skinZero: isZero,
                skinOne: isOne,
                skinTwo: isTwo,
                skinThree: isThree,
              }"
            >
              <span
                :class="{
                  'member-kukde-light': isKukde,
                  'member-kwandong': isKwandong,
                }"
                :style="{ color: activeColor, fontSize: activeFontSize + 'px' }"
                >{{ title }}</span
              >
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="d-flex align-center overflow-auto">
          <v-col class="align-center">
            <v-row class="justify-center" style="height: 60vh; margin: -80px;">
              <v-col cols="6" class="d-flex flex-column">
                <p class="member-kukde-light">디자인</p>
                <v-row class="justify-center align-content-around">
                  <v-col class="d-flex flex-column justify-space-around">
                    <div>
                      <v-row class="align-center" no-gutters dense>
                        <v-text-field label="* 제목" v-model="title">
                        </v-text-field>
                      </v-row>
                    </div>
                    <div style="margin: 10px">
                      <font-kind is-required @input="fontReceive" />
                    </div>
                    <div style="margin: 10px">
                      <font-size is-required @input="fontSizeReceive" />
                    </div>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div>
                          <v-text-field
                            v-model="showColor"
                            label="* 폰트 색상"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </div>
                      </template>
                      <v-color-picker
                        dot-size="25"
                        hide-inputs
                        mode="hexa"
                        swatches-max-height="200"
                        v-model="color"
                      ></v-color-picker>
                    </v-menu>
                    <div style="margin: 10px">
                      <skin is-required @input="skinReceive" />
                    </div>
                    <v-row>
                      <v-col class="d-flex flex-column justify-space-around">
                        <v-btn color="#fff" style="width: 3vw;" to="/main">
                          취소
                        </v-btn>
                      </v-col>
                      <v-col class="d-flex flex-column justify-space-around">
                        <v-btn
                          color="#231815"
                          style="width: 3vw;"
                          dark
                          @click="onSubmit"
                        >
                          완료
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import "../../assets/css/font.css";
import Navbar from "@/components/main/Navbar.vue";
import FontKind from "./Font.vue";
import FontSize from "./FontSize.vue";
import Skin from "./Skin.vue";
import { updatePastBook } from "@/api/past.js";
import { updateFutureBook } from "@/api/future.js";
export default {
  name: "Design",
  components: {
    Navbar,
    FontKind,
    FontSize,
    Skin,
  },
  data: () => ({
    id: "",
    page: "",
    title: "",
    font: "",
    fontSize: "",
    skin: "",
    activeColor: "#000000FF",
    activeFontSize: 20,
    isKukde: false,
    isKwandong: false,
    isZero: true,
    isOne: false,
    isTwo: false,
    isThree: false,
    type: "hex",
    hex: "",
  }),
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(v) {
        this[this.type] = v;
      },
    },
    showColor() {
      if (typeof this.color === "string") return this.color;

      return JSON.stringify(
        Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2));
          return color;
        }, {}),
        null,
        2
      );
    },
  },
  methods: {
    fontReceive(font) {
      this.font = font;
      if (font === 0) {
        this.isKukde = true;
        this.isKwandong = false;
      } else {
        this.isKukde = false;
        this.isKwandong = true;
      }
    },
    fontSizeReceive(fontSize) {
      this.fontSize = fontSize;
      if (fontSize === 0) {
        this.activeFontSize = 20;
      } else if (fontSize === 1) {
        this.activeFontSize = 25;
      } else if (fontSize === 2) {
        this.activeFontSize = 30;
      } else if (fontSize === 3) {
        this.activeFontSize = 35;
      } else {
        this.activeFontSize = 40;
      }
    },
    fontColorReceive(fontColor) {
      this.fontColor = fontColor;
      if (fontColor === 0) {
        this.activeColor = "white";
      } else {
        this.activeColor = "black";
      }
    },
    skinReceive(skin) {
      this.skin = skin;
      if (skin === 0) {
        this.isZero = true;
        this.isOne = false;
        this.isTwo = false;
        this.isThree = false;
      } else if (skin === 1) {
        this.isZero = false;
        this.isOne = true;
        this.isTwo = false;
        this.isThree = false;
      } else if (skin === 2) {
        this.isZero = false;
        this.isOne = false;
        this.isTwo = true;
        this.isThree = false;
      } else {
        this.isZero = false;
        this.isOne = false;
        this.isTwo = false;
        this.isThree = true;
      }
    },
    onSubmit() {
      const form = {
        id: this.id,
        page: this.page,
        title: this.title,
        size: this.fontSize,
        skin: this.skin,
        font: this.font,
        font_color: this.activeColor,
      };
      if (this.$route.params.status === "PAST") {
        updatePastBook(
          form,
          () => {
            this.$router.replace("/main");
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        updateFutureBook(
          form,
          () => {
            this.$router.replace("/main");
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
  },
  updated() {
    this.activeColor = this.color;
  },
  created() {
    const cover = this.$route.params.cover;
    this.id = cover.id;
    this.page = cover.page;
    this.title = cover.title;
    this.font = cover.font;
    if (cover.font === 0) {
      this.isKukde = true;
      this.isKwandong = false;
    } else {
      this.isKukde = false;
      this.isKwandong = true;
    }
    this.fontSize = cover.size;
    if (cover.size === 0) {
      this.activeFontSize = 20;
    } else if (cover.size === 1) {
      this.activeFontSize = 25;
    } else if (cover.size === 2) {
      this.activeFontSize = 30;
    } else if (cover.size === 3) {
      this.activeFontSize = 35;
    } else {
      this.activeFontSize = 40;
    }
    this.activeColor = cover.font_color;
    this.skin = cover.skin;
    if (cover.skin === 0) {
      this.isZero = true;
      this.isOne = false;
      this.isTwo = false;
      this.isThree = false;
    } else if (cover.skin === 1) {
      this.isZero = false;
      this.isOne = true;
      this.isTwo = false;
      this.isThree = false;
    } else if (cover.skin === 2) {
      this.isZero = false;
      this.isOne = false;
      this.isTwo = true;
      this.isThree = false;
    } else {
      this.isZero = false;
      this.isOne = false;
      this.isTwo = false;
      this.isThree = true;
    }
  },
};
</script>

<style scoped>
.container {
  width: 800px;
  height: 500px;
  perspective: 1500px;
  cursor: pointer;
}
.img,
.img::before {
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}
.img {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  background-position: center;
  transition: all 0.3s;
  position: relative;
}
.img::before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 60px;
  height: 100%;
  transform: rotateY(100deg);
  transform-origin: 0 50%;
  filter: brightness(70%);
}
.img:hover {
  transform: rotateY(30deg) scale(1.1);
}
.img > span {
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 70px;
  font-size: 30px;
  color: black;
}
.skinZero,
.skinZero::before {
  background-image: url("https://autobiography.s3.ap-northeast-2.amazonaws.com/1620747619023.png");
}
.skinOne,
.skinOne::before {
  background-image: url("https://autobiography.s3.ap-northeast-2.amazonaws.com/1620747657994.png");
}
.skinTwo,
.skinTwo::before {
  background-image: url("https://autobiography.s3.ap-northeast-2.amazonaws.com/1620747682861.png");
}
.skinThree,
.skinThree::before {
  background-image: url("https://autobiography.s3.ap-northeast-2.amazonaws.com/1621263240811.png");
}
</style>
