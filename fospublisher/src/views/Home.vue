<template>
  <v-container>
    <p>로그인 페이지로 이동</p>
    <v-btn @click="$router.push('Login')">로그인</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>
