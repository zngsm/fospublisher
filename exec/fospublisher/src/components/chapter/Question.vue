<template>
  <div>
    <h1 class="create-left-question-title text-center">
      오늘의 질문
    </h1>
    <div class="create-left-question-content">
      {{ todayQuestion }}
    </div>
    <v-btn class="create-left-question-button" large @click="getTodayQuestion">
      다른 질문 받기
    </v-btn>
    <!-- <button class="create-left-question-button" @click="getTodayQuestion">
      다른 질문 받기
    </button> -->
  </div>
</template>

<script>
import { getQuestion } from "@/api/past.js";
import store from "@/store";
import { mapState } from "vuex";
export default {
  name: "Question",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getTodayQuestion() {
      getQuestion(
        this.todayQuestionId,
        (res) => {
          store.commit("question/setQuestion", res.data.question);
          store.commit("question/setQuestionId", res.data.id);
          this.$emit("changeQuestion");
        },
        (err) => console.error(err)
      );
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

<style lang="scss" scoped></style>
