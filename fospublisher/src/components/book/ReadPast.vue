<template>
  <div>
    <div id="flipbook">
      <!-- hard: 표지 앞,뒤 -->
      <div v-if="bookInfo.cover" class="hard">{{ bookInfo.cover.title }}</div>
      <!-- 저자소개 -->
      <div class="hard"><WriterInfo /></div>
      <!-- 선택 버튼 -->
      <div>
        <button @click="$router.push('create')">쓰기</button>
        <br />
        <button>읽기</button>
        <br />
        <button>디자인</button>
        <button>출품</button>
      </div>
      <div>
        <h1>목차</h1>
      </div>
      <div v-for="(item, idx) in bookInfo.content" :key="idx">
        <h1 @click="turn">{{ item.title }}</h1>
        <p>{{ item.content }}</p>
      </div>
      <div class="hard"></div>
      <div class="hard"></div>
    </div>
  </div>
</template>

<script>
import WriterInfo from "../member/WriterInfo.vue";
export default {
  name: "ReadPast",
  components: { WriterInfo },
  props: {
    bookInfo: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    test() {
      window.$("#flipbook").turn({
        width: 1200,
        height: 900,
        page: 3,
        // acceleration: true,
        gradients: true,
      });
    },
    turn() {
      window.$("#flipbook").bind("turning", function(event, page) {
        if (page == 1) {
          event.preventDefault();
        }
      });
    },
  },
  mounted() {
    if (this.bookInfo) {
      this.test();
    }
  },
};
</script>

<style scoped>
@import "../../assets/css/ReadPast.css";
</style>
