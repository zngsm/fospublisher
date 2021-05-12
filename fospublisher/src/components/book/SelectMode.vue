<template>
  <!-- 선택 버튼 -->
  <div class="button-container writer-kwandong">
    <button @click="goToCreate">
      <img
        class="iconImg"
        src="@/assets/past/create.png"
        alt="쓰기 아이콘"
        style="width:52px vertical-align:bottom"
      /><span>쓰기</span>
    </button>
    <br />
    <button>
      <img
        class="iconImg"
        src="@/assets/past/read.png"
        alt="읽기 아이콘"
      /><span>읽기</span>
    </button>
    <br />
    <button @click="$router.push('Design')">
      <img
        class="iconImg"
        src="@/assets/past/design.png"
        alt="디자인 아이콘"
      /><span>디자인</span>
    </button>
    <br />

    <button>
      <img
        class="iconImg"
        src="@/assets/past/publish.png"
        alt="출품 아이콘"
      /><span>출품</span>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goToCreate() {
      this.$router.push({ name: "CreatePast", params: { status: "PAST" } });
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/font.css";
@import "../../assets/css/ReadPast.css";
</style>
