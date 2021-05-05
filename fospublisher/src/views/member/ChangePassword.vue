<template>
  <v-container fluid class="member-kwandong">
    <v-row class="align-center" style="height: 100vh">
      <v-col cols="6">
        <left-side></left-side>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6">
        <v-row justify="center">
          <div style="width: 30vw">
            <p class="member-kukde-light">비밀번호 변경</p>
            <v-row class="justify-center align-content-around">
              <v-col class="d-flex flex-column justify-space-around">
                <div>
                  <v-text-field
                    label="* 새 비밀번호"
                    v-model.lazy="password"
                    type="password"
                    @keypress.enter.prevent
                    autocomplete="off"
                  ></v-text-field>
                  <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                  <div
                    class="validation-kwandong"
                    v-if="
                      validationErrors.password !== undefined ||
                      this.password == ''
                    "
                  >
                    {{ validationErrors.password }}
                  </div>
                  <!-- -------------------------------------------------------- -->
                </div>
                <div>
                  <v-text-field
                    label="* 새 비밀번호 확인"
                    type="password"
                    autocomplete="off"
                    v-model="passwordConfirm"
                    required
                    @keyup.enter="changePw"
                  >
                  </v-text-field>
                  <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                  <div
                    class="validation-kwandong"
                    v-if="
                      validationErrors.passwordConfirm !== undefined ||
                      this.passwordConfirm == ''
                    "
                  >
                    {{ validationErrors.passwordConfirm }}
                  </div>
                  <!-- -------------------------------------------------------- -->
                </div>
                <div v-show="!userId">
                  <password-question />
                </div>
                <div v-show="!userId">
                  <v-text-field label="새 비밀번호 찾기 답변"></v-text-field>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="text-center">
            <v-row class="justify-center">
              <v-btn
                color="#fff"
                class="ma-5"
                style="width: 12vw"
                to="/"
                x-large
                >취소</v-btn
              >
              <div v-if="!userId">
                <v-btn
                  color="#231815"
                  class="ma-5"
                  style="width: 12vw"
                  dark
                  x-large
                  type="submit"
                  @click="changePw"
                  >비밀번호 변경</v-btn
                >
              </div>
              <div v-else>
                <v-btn
                  color="#231815"
                  class="ma-5"
                  style="width: 12vw"
                  dark
                  x-large
                  type="submit"
                  @click="changePwOnly"
                  >비밀번호 변경</v-btn
                >
              </div>
              <!-- Start 비밀번호 변경 모달 -->
              <v-dialog v-model="dialog" width="25vw">
                <message-modal
                  v-if="isSuccessChangePw"
                  body-content="변경이 완료되었습니다."
                  @submit="moveToLogin"
                />
              </v-dialog>
              <!-- End  비밀번호 변경 모달 -->
            </v-row>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/font.css";
import LeftSide from "../../components/member/LeftSide";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
import MessageModal from "../../components/MessageModal";
import { editPassword, checkUserInfo, editQuestion } from "@/api/account";
import { mapState } from "vuex";
export default {
  components: { LeftSide, PasswordQuestion, MessageModal },
  props: {
    userId: {
      type: Number,
      require: false,
    },
  },
  data: () => ({
    form: "",
    password: "",
    passwordConfirm: "",
    question: null,
    answer: "",
    isSuccessChangePw: false,
    dialog: false,
    formHasErros: false,
  }),
  computed: {
    ...mapState("error", {
      validationErrors: (state) => state.validations,
    }),
  },
  methods: {
    // 로그인 페이지로 이동
    moveToLogin() {
      this.$router.push("/login");
    },
    // 모달 종료
    closeDialog() {
      this.isSuccessChangePw = false;
      this.dialog = false;
    },
    // 폼 만들기
    makeForm() {
      this.form = {
        userId: this.userId,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        question: this.question,
        answer: this.answer,
      };
    },
    // 데이터 채우기
    fillData() {
      if (
        this.question === null ||
        this.answer === null ||
        this.question === "" ||
        this.answer === ""
      ) {
        checkUserInfo(
          (res) => {
            if (res.status === 200) {
              this.question = res.data.user.question;
              this.answer = res.data.user.answer;
            }
          },
          () => {
            return;
          }
        );
      }
    },
    // 패스워드만 변경
    changePwOnly() {
      this.makeForm();
      editPassword(
        this.form,
        (res) => {
          if (res.status === 200 || res.status === 201) {
            this.dialog = true;
            this.isSuccessChangePw = true;
          } else {
            return;
          }
        },
        () => {
          return;
        }
      );
    },
    // 패스워드+질문 변경 실행
    doEdit() {
      editQuestion(
        this.form,
        (res) => {
          if (res.status === 200 || res.status === 201) {
            this.dialog = true;
            this.isSuccessChangePw = true;
          }
        },
        () => {
          return;
        }
      );
    },
    // 패스워드+질문 변경 요청
    changePw() {
      this.fillData();
      this.makeForm();
      setTimeout(() => {
        this.doEdit();
      }, 50);
    },
  },
};
</script>
