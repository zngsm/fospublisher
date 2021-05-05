<template>
  <v-container>
    <p>로그인 페이지로 이동</p>
    <v-btn @click="$router.push('Login')">로그인</v-btn>
    <v-btn @click="$router.push('timeline')">타임라인</v-btn>
    <nav-profile></nav-profile>
    <writer-info></writer-info>
  </v-container>
</template>

<script>
import NavProfile from "../components/main/NavProfile.vue";
import WriterInfo from "../components/member/WriterInfo.vue";
export default {
  name: "Home",
  components: { NavProfile, WriterInfo },
};
</script>
