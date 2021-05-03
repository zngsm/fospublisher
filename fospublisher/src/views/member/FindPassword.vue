<template>
  <v-container fluid class="member-kwandong find-password">
    <v-row class="align-center" style="height: 100vh">
      <v-spacer></v-spacer>
      <left-side></left-side>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-spacer></v-spacer>
      <div>
        <v-col>
          <p class="member-kukde-light">비밀번호 찾기</p>
          <div class="d-flex align-center flex-column">
            <div style="width: 25vw">
              <v-text-field label="아이디" v-model="username"></v-text-field>
              <password-question @input="questionReceive" />
              <v-text-field
                label="비밀번호 찾기 답변"
                v-model="answer"
              ></v-text-field>
              <div class="text-center">
                <v-btn
                  block
                  color="#231815"
                  class="my-6"
                  dark
                  depressed
                  x-large
                  type="submit"
                  @click="findPassword"
                  >비밀번호 찾기</v-btn
                >
              </div>
            </div>
            <v-row>
              <v-btn
                text
                :ripple="false"
                class="text-decoration-underline"
                to="/register"
                >회원가입</v-btn
              >
              <v-btn
                text
                :ripple="false"
                class="text-decoration-underline"
                to="/login"
                >로그인</v-btn
              >
            </v-row>
          </div>
        </v-col>
      </div>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/font.css";
import LeftSide from "../../components/member/LeftSide";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
// import MessageModal from "../../components/MessageModal";
import { confirmQuestion } from "../../api/account";

export default {
  components: {
    LeftSide,
    PasswordQuestion,
    // MessageModal,
  },
  data: () => ({
    dialog: false,
    isSuccessSignup: false,
    isFailedSignup: false,
    username: "",
    question: 0,
    answer: "",
    form: "",
  }),
  methods: {
    questionReceive(question) {
      this.question = question;
    },
    closeDialog() {
      this.isDuplicated = false;
      this.isNotDuplicated = false;
      this.isFailedSignup = false;
      this.dialog = false;
    },
    findPassword() {
      this.form = {
        username: this.username,
        question: this.question,
        answer: this.answer,
      };
      confirmQuestion(
        this.form,
        (res) => {
          if (res.data.result === "OK") {
            let userId = res.data.userId;
            this.$router.push({
              name: "ChangePassword",
              params: { userId: userId },
            });
          } else {
            if (res.data.result === "FAIL") {
              console.log(res.data.result);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>
