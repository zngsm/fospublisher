<template>
  <div>
    <div class="left">
      <h1>오늘의 질문</h1>
      <button>질문 받기</button>
    </div>
    <div class="right">
      <input placeholder="제목" />
      <h2>언제 있었던 일인가요?</h2>
      <input placeholder="예: 1995" />년
      <!-- 나중에 에디터 자리 -->
      <textarea>그 때의 기억을 떠올려보세요</textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "PastCreate",
  props: {
    bookInfo: {
      type: Object,
    },
  },
};
</script>

<style></style>
