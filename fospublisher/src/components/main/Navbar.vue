<template>
  <div class="navbar">
    <input type="checkbox" id="menuicon" />
    <label for="menuicon">
      <!-- <div> -->
      <i v-if="!isQuestion" class="material-icons" @click="!isQuestion"
        >expand_less</i
      >
      <i v-if="isQuestion" class="material-icons" @click="!isQuestion"
        >expand_more</i
      >
      <!-- <v-icon @click="displayQuestion" color="white" style="z-index:2"
          >mdi-chevron-double-up</v-icon
        >-->
      <!-- </div> -->
    </label>
    <div class="sidebar">
      <span>{{ todayQuestion }}</span>
      <i class="material-icons">expand_less</i>
      <i class="material-icons">expand_more</i>
    </div>
    <!-- <div>
      <div
        :class="{ noquestion: !isQuestion, question: isQuestion }"
        style="display:flex; justify-content: center; text-align: center; display: '';"
      >
        <p>{{ todayQuestion }}</p>
      </div>
      <v-btn
        v-if="isQuestion"
        x-small
        fab
        text
        style="position:absolute; display:block; margin-left:1450px; margin-top:-31px;"
        ><v-icon @click="displayQuestion" color="white"
          >mdi-chevron-double-up</v-icon
        >
      </v-btn>
      <v-btn
        v-if="!isQuestion"
        x-small
        fab
        text
        style="position:absolute; display:block; margin-left:1450px; margin-top:-31px;"
        ><v-icon @click="displayQuestion" color="black"
          >mdi-chevron-double-down</v-icon
        >
      </v-btn>
    </div> -->

    <NavProfile />
    <div>
      <button class="navtab main-kukde-light" @click="goToMain">
        책장
      </button>
    </div>
    <div>
      <button class="navtab main-kukde-light" @click="goToTimeline">
        일대기
      </button>
    </div>
    <div>
      <button class="navtab main-kukde-light" @click="$router.push('library')">
        보관함
      </button>
    </div>
    <p class="navbar-question nav-kukde-light">{{ todayQuestion }}</p>
    <!-- <div v-for="(item, idx) in question" :key="idx">
      <p class="navbar-question nav-kukde-light">{{ item }}</p>
    </div> -->
  </div>
</template>

<script>
import NavProfile from "./NavProfile.vue";
import { getQuestion } from "@/api/past.js";
import store from "@/store";
import { mapState } from "vuex";
export default {
  name: "Navbar",
  components: { NavProfile },
  data() {
    return { isQuestion: true };
  },
  methods: {
    displayQuestion() {
      let question = document.getElementById("question");
      if (question.style.display == "none") {
        console.log('none -> "" ');
        question.style.display = "";
      } else {
        console.log('"" -> none ');
        question.style.display = "none";
      }
    },
    goToMain() {
      this.$router.push("Main").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    goToTimeline() {
      this.$router.push("timeline").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    goToLibrary() {
      this.$router.push("").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
  },
  mounted() {
    getQuestion(1, (res) => {
      store.commit("question/setQuestion", res.data.question);
      store.commit("question/setQuestionId", res.data.id);
    });
  },
  computed: {
    ...mapState({
      todayQuestion: (state) => state.question.todayQuestion,
      todayQuestionId: (state) => state.question.todayQuestionId,
    }),
  },
};
</script>

<style lang="css" scoped></style>
