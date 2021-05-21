<template>
  <v-container fluid style="padding: 0;">
    <div class="book-container" style="padding: 0;">
      <div
        @click="sendBookInfo"
        class="main-pastBook"
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
          :style="{ color: coverInfo.font_color, fontSize: fontSize + 'px' }"
          >{{ coverInfo.title }}</span
        >
      </div>
    </div>
  </v-container>
</template>

<script>
import { getCoverInfo } from "@/api/past";
export default {
  data: () => {
    return {
      coverInfo: {},
      isZero: false,
      isOne: false,
      isTwo: false,
      isThree: false,
      fontSize: null,
      isKukde: false,
      isKwandong: false,
    };
  },
  methods: {
    convertSkinInfo() {
      let skin = this.coverInfo.skin;
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
    convertFontInfo() {
      let font = this.coverInfo.font;
      let size = this.coverInfo.size;
      // 폰트 종류
      if (font === 0) {
        this.isKukde = true;
        this.isKwandong = false;
      } else {
        this.isKukde = false;
        this.isKwandong = true;
      }
      // 폰트 크기
      if (size === 0) {
        this.fontSize = 20 * 0.6875;
      } else if (size === 1) {
        this.fontSize = 25 * 0.6875;
      } else if (size === 2) {
        this.fontSize = 30 * 0.6875;
      } else if (size === 3) {
        this.fontSize = 35 * 0.6875;
      } else {
        this.fontSize = 40 * 0.6875;
      }
    },
    sendBookInfo() {
      this.$router.push({
        name: "ReadPast",
        params: { status: "PAST" },
      });
    },
  },
  mounted() {
    getCoverInfo(
      (res) => {
        this.coverInfo = res.data;
        // sessionStorage.setItem("bookInfo", JSON.stringify(this.bookInfo));
        this.convertSkinInfo();
        this.convertFontInfo();
      },
      (err) => console.error(err)
    );
  },
};
</script>

<style></style>
