<template>
  <v-row>
    <div class="left-side">
      <!-- start 테스트용 -->
      <router-link to="/">
        <button>Main</button>
      </router-link>
      <!-- end 테스트용 -->
      <v-img id="logo" src="~@/assets/logo.png" alt="역전출판사" />
      <img id="logo" src="~@/assets/logo.png" alt="역전출판사" />
    </div>
    <v-divider vertical></v-divider>
    <div class="right-side">
      <p>
        역전 출판사에 오신 것을 환영합니다. <br />
        과거를 기록하여 자서전을 내보세요!!
      </p>
      <v-text-field label="아이디"></v-text-field>
      <v-text-field label="비밀번호"></v-text-field>
      <v-btn depressed>로그인</v-btn>
    </div>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
/* #logo {
  height:40vh;
  width: auto;
  
}
.left-side {
  display: flex;
  flex-direction: column;
} */
</style>