<template>
  <div ondragstart="return false" onselectstart="return false">
    <div class="home">
      <video muted autoplay loop>
        <source
          src="https://autobiography.s3.ap-northeast-2.amazonaws.com/1621153837417.mp4"
          type="video/mp4"
        />
      </video>
      <div class="home-body">
        <div class="home-body-about">
          <div class="home-body-logo">
            <img src="@/assets/logo2.png" alt="로고" />
          </div>
          <div class="home-body-description">
            <div class="home-title">역전기록소</div>
            <div class="home-content">; 당신의 여정을 기록하세요</div>
          </div>
        </div>
        <p class="typing" id="typingQuestion"></p>
        <v-btn class="home-body-btn" @click="start">지금 시작하기</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/home.css";
import { getQuestion } from "@/api/past.js";
import { mapState } from "vuex";
import store from "@/store";
import jquery from "jquery";
require("jquery");
export default {
  name: "Home",
  data() {
    return {
      questionWordBreak: [],
      typingBool: false,
      typingIdx: 0,
    };
  },
  methods: {
    start() {
      if (localStorage.getItem("userId")) {
        this.$router.push("Main");
      } else {
        this.$router.push("Login");
      }
    },
  },
  async mounted() {
    let today = new Date().toLocaleDateString();
    let savedDay = localStorage.getItem("today");
    if (!savedDay || savedDay != today || !this.todayQuestion) {
      await getQuestion(
        this.todayQuestionId ? this.todayQuestionId : 1,
        (res) => {
          store.commit("question/setQuestion", res.data.question);
          store.commit("question/setQuestionId", res.data.id);
          this.questionWordBreak = this.todayQuestion.split("");
          if (!this.typingBool) {
            this.typingBool = true;
            let tyInt = setInterval(() => {
              if (this.typingIdx < this.questionWordBreak.length) {
                jquery(".typing").append(
                  this.questionWordBreak[this.typingIdx]
                );
                this.typingIdx++;
              } else {
                clearInterval(tyInt);
              }
            }, 200);
          }
        }
      );
      localStorage.setItem("today", today);
    } else {
      this.questionWordBreak = this.todayQuestion.split("");
      if (!this.typingBool) {
        this.typingBool = true;
        let tyInt = setInterval(() => {
          if (this.typingIdx < this.questionWordBreak.length) {
            jquery(".typing").append(this.questionWordBreak[this.typingIdx]);
            this.typingIdx++;
          } else {
            clearInterval(tyInt);
          }
        }, 200);
      }
    }
  },
  computed: {
    ...mapState({
      todayQuestion: (state) => state.question.todayQuestion,
      todayQuestionId: (state) => state.question.todayQuestionId,
    }),
  },
};
</script>
<style></style>
