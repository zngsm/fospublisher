<template>
  <div>
    <navbar />
    <v-container fluid>
      <v-row style="height: 100vh">
        <v-col cols="6" class="d-flex align-center overflow-auto">
          <div class="container">
            <div class="img">
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
                    <div style="margin: 10px">
                      <font-color is-required @input="fontColorReceive" />
                    </div>
                    <div style="margin: 10px">
                      <skin is-required @input="skinReceive" />
                    </div>
                    <div style="margin: 10px">
                      <skin-color is-required @input="skinColorReceive" />
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
import FontColor from "./FontColor.vue";
import SkinColor from "./SkinColor.vue";
import Skin from "./Skin.vue";
export default {
  name: "Design",
  components: {
    Navbar,
    FontKind,
    FontSize,
    FontColor,
    SkinColor,
    Skin,
  },
  data: () => ({
    title: "",
    font: "",
    fontSize: "",
    fontColor: "",
    skin: "",
    skinColor: "",
    activeColor: "black",
    activeFontSize: 20,
    isKukde: false,
    isKwandong: false,
  }),
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
    },
    skinColorReceive(skinColor) {
      this.skinColor = skinColor;
    },
  },
};
</script>

<style scoped>
.container {
  width: 800px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;
}
.img,
.img::before {
  background-image: url("https://cdn.crowdpic.net/list-thumb/thumb_l_1D33CF5131DEC3BAE8D83FF7D6EE63B8.jpg");
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
</style>
