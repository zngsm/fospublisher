<template>
  <div class="navbar">
    <NavProfile />
    <div>
      <button class="navtab main-kukde-light" @click="$router.push('Main')">
        책장
      </button>
    </div>
    <div>
      <button class="navtab main-kukde-light" @click="$router.push('timeline')">
        일대기
      </button>
    </div>
    <p class="navbar-question nav-kukde-light">{{ question }}</p>
    <!-- <div v-for="(item, idx) in question" :key="idx">
      <p class="navbar-question nav-kukde-light">{{ item }}</p>
    </div> -->
  </div>
</template>

<script>
import NavProfile from "./NavProfile.vue";
import { getQuestion } from "@/api/past.js";
import store from "@/store";
export default {
  name: "Navbar",
  components: { NavProfile },
  data: () => {
    return { question: "" };
  },
  mounted() {
    getQuestion(1, (res) => {
      store.commit("question/setQuestion", res.data.question);
      // this.question = res.data.question.split("?");
      this.question = res.data.question;
    });
  },
};
</script>

<style lang="css" scoped></style>
