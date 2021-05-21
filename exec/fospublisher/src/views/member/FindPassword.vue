<template>
  <v-container fluid grid-list-md fill-height>
    <v-row>
      <v-col cols="6" class="d-flex align-center justify-end pa-16">
        <div>
          <v-img
            contain
            src="../../assets/logo.png"
            alt="역전출판사"
            height="300px"
          />
        </div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6" class="d-flex align-center pa-16">
        <div>
          <p class="page-title-bold">비밀번호 찾기</p>
          <br />
          <div class="d-flex align-center flex-column pl-8">
            <div class="member-input-size">
              <v-text-field label="* 아이디" v-model="username"></v-text-field>
              <password-question isRequired @input="questionReceive" />
              <v-text-field
                label="* 비밀번호 찾기 답변"
                v-model="answer"
                @keyup.enter="findPassword"
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
                <!-- Start 비밀번호찾기 모달 -->
                <v-dialog v-model="dialog" width="300px">
                  <message-modal
                    v-if="isFailedFind"
                    body-content="회원정보를 찾을 수 없습니다.<br />답변이 기억나지 않는다면,<br />201publisher@gmail.com으로 문의바랍니다."
                    @submit="closeDialog"
                    v-click-outside="closeDialog"
                  />
                  <message-modal
                    v-if="isEmpty"
                    body-content="입력이 올바르지 않습니다."
                    v-click-outside="closeDialog"
                    @submit="closeDialog"
                  />
                </v-dialog>
                <!-- End 비밀번호찾기 모달 -->
              </div>
            </div>
            <v-row class="justify-center">
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/member.css";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
import MessageModal from "../../components/MessageModal";
import { confirmQuestion } from "../../api/account";

export default {
  components: {
    PasswordQuestion,
    MessageModal,
  },
  data: () => ({
    dialog: false,
    isFailedFind: false,
    isEmpty: false,
    username: "",
    question: null,
    answer: "",
    formHasErrors: false,
  }),
  computed: {
    form() {
      return {
        username: this.username,
        question: this.question,
        answer: this.answer,
      };
    },
  },
  methods: {
    questionReceive(question) {
      this.question = question;
    },
    closeDialog() {
      this.isFailedFind = false;
      this.isEmpty = false;
      this.dialog = false;
    },
    findPassword() {
      if (
        this.username === "" ||
        this.question === null ||
        this.answer === ""
      ) {
        this.dialog = !this.dialog;
        this.isEmpty = true;
      } else {
        confirmQuestion(
          this.form,
          (res) => {
            if (res.data.result === "OK") {
              localStorage.setItem("tempUserId", res.data.userId);
              this.$router.replace("/changePassword");
            } else {
              if (res.data.result === "FAIL") {
                this.dialog = !this.dialog;
                this.isFailedFind = true;
              }
            }
          },
          () => {
            this.dialog = !this.dialog;
            this.isFailedFind = true;
          }
        );
      }
    },
  },
};
</script>
