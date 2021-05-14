<template>
  <div>
    <div
      v-if="bookInfo"
      @click="sendBookInfo"
      class="main-pastBook"
      :style="{
        backgroundColor: bookInfo.cover.skin_color,
        fontColor: bookInfo.cover.font_color,
        fontSize: fontSize,
      }"
    >
      <p>{{ bookInfo.cover.title }}</p>
    </div>
    <!-- <div v-else class="main-pastBook">
      과거책
    </div> -->
  </div>
</template>

<script>
import { readPastBook } from "@/api/past";
export default {
  data: () => {
    return {
      bookInfo: {
        cover: {
          page: 0,
          title: "",
          size: 0,
          skin: 0,
          font: 0,
          font_color: "#000000",
        },
        content: [],
        list: {},
      },
      fontSize: null,
    };
  },
  methods: {
    getFontSize(size) {
      if (size == 1) {
        this.fontSize = "large";
      } else if (size == 2) {
        this.fontSize = "x-large";
      }
    },
    sendBookInfo() {
      this.$router.push({
        name: "ReadPast",
        params: { bookInfo: this.bookInfo },
      });
    },
  },
  mounted() {
    readPastBook(
      (res) => {
        this.bookInfo = res.data;
        sessionStorage.setItem("bookInfo", JSON.stringify(this.bookInfo));
        this.getFontSize(res.data.cover.font);
      },
      (err) => console.error(err)
    );
  },
};
</script>

<style></style>
