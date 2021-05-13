<template>
  <div
    v-if="bookInfo"
    @click="sendBookInfo"
    class="main-futureBook"
    :style="{
      backgroundColor: bookInfo.cover.skin_color,
      fontColor: bookInfo.cover.font_color,
      fontSize: fontSize,
    }"
  >
    <p>{{ bookInfo.cover.title }}</p>
  </div>
</template>

<script>
import { readFutureBook } from "@/api/future";
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
    readFutureBook(
      (res) => {
        this.bookInfo = res.data;
        this.getFontSize(res.data.cover.font);
      },
      (err) => console.error(err)
    );
  },
};
</script>

<style></style>
