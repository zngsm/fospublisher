<template>
  <div class="navbar">
    <div>
      <input type="checkbox" id="menuicon" />
      <label for="menuicon">
        <i
          v-if="!isQuestion"
          class="material-icons"
          style="color: var(--color-dark)"
          @click="isQuestion = true"
          >expand_more
        </i>
        <i v-if="isQuestion" class="material-icons" @click="isQuestion = false"
          >expand_less
        </i>
        <!-- <v-icon @click="displayQuestion" color="white" style="z-index:2"
          >mdi-chevron-double-up</v-icon
        >-->
      </label>
      <div class="sidebar">
        <span>{{ todayQuestion }}</span>
      </div>
      <NavProfile />
      <div>
        <button class="navtab main-kukde-light" @click="goToMain">책장</button>
      </div>
      <div>
        <button class="navtab main-kukde-light" @click="goToTimeline">
          일대기
        </button>
      </div>
      <div>
        <button class="navtab main-kukde-light" @click="goToLibrary">
          보관함
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavProfile from "./NavProfile.vue";
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
      this.$router.push("/main").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    goToTimeline() {
      this.$router.push("/timeline").catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
    goToLibrary() {
      this.$router.push({ name: "Library", params: { id: 1 } }).catch((err) => {
        if (err.name === "NavigationDuplicated") {
          location.reload();
        }
      });
    },
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
