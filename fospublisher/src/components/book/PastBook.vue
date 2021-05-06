<template>
  <div
    v-if="bookInfo"
    class="Main__past-book"
    @click="sendBookInfo"
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
import { readPastBook } from "@/api/past";
export default {
  data: () => {
    return {
      bookInfo: null,
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
        this.getFontSize(res.data.cover.font);
      },
      (err) => console.error(err)
    );
  },
};
</script>

<style scoped>
.Main__past-book {
  width: 294px;
  height: 416px;
  border: 1px solid black;
}
</style>
