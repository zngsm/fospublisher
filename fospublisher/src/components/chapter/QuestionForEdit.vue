<template>
  <div>
    <h1 class="create-left-question-title text-center">
      질문
    </h1>
    <div class="create-left-question-content">
      {{ questionData }}
    </div>
  </div>
</template>

<script>
import { getSelectedQuesion } from "@/api/past.js";
export default {
  name: "Questionforedit",
  data() {
    return {
      questionData: null,
    };
  },
  props: {
    question: Number,
  },
  methods: {
    getQuestion() {
      getSelectedQuesion(
        this.question,
        (res) => {
          this.questionData = res.data.question;
        },
        (err) => {
          console.error(err);
        }
      );
    },
  },
  mounted() {
    this.getQuestion();
  },
};
</script>

<style lang="scss" scoped></style>
