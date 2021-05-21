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
          <p class="page-title-bold">비밀번호 변경</p>
          <br />
          <div class="member-input-size">
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
                    class="validation"
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
                    class="validation"
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

          <v-row class="justify-center">
            <v-btn color="#fff" class="ma-5 member-btn-size" large to="/"
              >취소</v-btn
            >
            <div v-if="!userId">
              <v-btn
                color="#231815"
                class="ma-5 member-btn-size"
                dark
                large
                type="submit"
                @click="changePw"
                >비밀번호 변경</v-btn
              >
            </div>
            <div v-else>
              <v-btn
                color="#231815"
                class="ma-5 member-btn-size"
                dark
                large
                type="submit"
                @click="changePwOnly"
                >비밀번호 변경</v-btn
              >
            </div>
            <!-- Start 비밀번호 변경 모달 -->
            <v-dialog v-model="dialog" width="300px">
              <message-modal
                v-if="isSuccessChangePw"
                body-content="변경이 완료되었습니다."
                @submit="moveToLogin"
                v-click-outside="moveToLogin"
              />
            </v-dialog>
            <!-- End  비밀번호 변경 모달 -->
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/member.css";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
import MessageModal from "../../components/MessageModal";
import { editPassword, checkUserInfo, editQuestion } from "@/api/account";
import { mapState } from "vuex";
export default {
  components: { PasswordQuestion, MessageModal },
  data: () => ({
    form: "",
    password: "",
    userId: "",
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
      if (this.userId) {
        this.$router.push("/login");
      } else {
        this.$router.push("/main");
      }
    },
    // 모달 종료
    closeDialog() {
      this.isSuccessChangePw = false;
      this.dialog = false;
    },
    // 패스워드만 변경
    changePwOnly() {
      this.form = {
        userId: this.userId,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        question: this.question,
        answer: this.answer,
      };
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
      if (
        this.question === null ||
        this.answer === null ||
        this.question === "" ||
        this.answer === ""
      ) {
        checkUserInfo(
          (res) => {
            if (res.status === 200) {
              this.form = {
                password: this.password,
                passwordConfirm: this.passwordConfirm,
                question: res.data.user.question,
                answer: res.data.user.answer,
              };
              this.doEdit();
            }
          },
          () => {
            return;
          }
        );
      } else {
        this.doEdit();
      }
    },
  },
  created() {
    if (localStorage.getItem("tempUserId")) {
      this.userId = localStorage.getItem("tempUserId");
    }
  },
  destroyed() {
    localStorage.removeItem("tempUserId");
    localStorage.removeItem("tempAccept");
  },
};
</script>
