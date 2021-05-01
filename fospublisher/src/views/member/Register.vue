<template>
  <v-container fluid class="member-kwandong">
    <v-row style="height: 100vh">
      <v-img
        width="8vw"
        style="position: absolute; margin: 1vh 1vw"
        contain
        src="../../assets/logo.png"
        alt="역전출판사"
      ></v-img>
      <v-col cols="6" class="d-flex align-center overflow-auto">
        <v-col class="align-center">
          <v-row
            class="justify-center align-content-around"
            style="height: 80vh"
          >
            <v-col cols="6" class="d-flex flex-column align-content-around">
              <p class="member-kukde-light">회원가입</p>
              <v-row align="center" no-gutters>
                <v-text-field
                  label="* 아 이 디"
                  v-model="username"
                ></v-text-field>
                <v-btn width="5vw" small dark color="#231815" @click="checkId">
                  중복확인
                </v-btn>
                <!-- Start 중복확인 모달 -->
                <v-dialog v-model="dialog" width="25vw">
                  <message-modal
                    v-if="isDuplicated"
                    body-content="중복된 아이디가 존재합니다.<br />다시 입력해주세요."
                    @submit="closeDialog"
                  />
                  <message-modal
                    v-if="isNotDuplicated"
                    body-content="사용 가능한 아이디입니다."
                    @submit="closeDialog"
                  />
                </v-dialog>
                <!-- End 중복확인 모달 -->
              </v-row>
              <v-text-field
                label="* 닉 네 임"
                v-model="nickname"
              ></v-text-field>
              <v-text-field
                label="* 비 밀 번 호"
                v-model="password"
                type="password"
              ></v-text-field>
              <v-text-field
                label="* 비 밀 번 호 확 인"
                v-model="passwordConfirm"
                type="password"
                required
              ></v-text-field>
              <data-picker @birthday="dateReceive" />
              <v-row no-gutters>
                <password-question is-required @input="questionReceive" />
              </v-row>
              <v-text-field
                label="* 비밀번호 찾기 답변"
                v-model="answer"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col cols="6" class="d-flex align-center overflow-auto">
        <v-col class="align-center">
          <v-row
            class="justify-center align-content-around"
            style="height: 80vh"
          >
            <v-col cols="8" class="d-flex flex-column align-content-around">
              <p class="member-kukde-light">선택사항</p>
              <avatar-select @sendImg="imgReceive" />
              <v-textarea
                clearable
                auto-grow
                outlined
                rows="10"
                v-model="introduce"
                label="프 로 필 소 개"
              ></v-textarea>
              <v-row class="justify-space-around">
                <v-btn
                  color="#fff"
                  style="width: 10vw; margin: 1vh 0"
                  to="/login"
                >
                  취소
                </v-btn>
                <v-btn
                  color="#231815"
                  style="width: 10vw; margin: 1vh 0"
                  dark
                  type="submit"
                  @click="onSubmit"
                >
                  회원가입
                </v-btn>
                <!-- Start 회원가입 모달 -->
                <v-dialog v-model="dialog" width="25vw">
                  <message-modal
                    v-if="isSuccessSignup"
                    body-content="회원가입에 성공했습니다. 로그인 페이지로 이동합니다."
                    @submit="moveToLogin"
                  />
                  <message-modal
                    v-if="isFailedSignup"
                    body-content="회원가입이 실패했습니다. 다시 시도해주세요."
                    @submit="closeDialog"
                  />
                </v-dialog>
                <!-- End 회원가입 모달 -->
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/font.css";
import DataPicker from "../../components/member/DataPicker.vue";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
import AvatarSelect from "../../components/member/AvatarSelect.vue";
import MessageModal from "../../components/MessageModal";
import { checkDuplicateId, signUp } from "../../api/account";

export default {
  components: { DataPicker, PasswordQuestion, AvatarSelect, MessageModal },
  data: () => ({
    dialog: false,
    isDuplicated: false,
    isNotDuplicated: false,
    isSuccessSignup: false,
    isFailedSignup: false,
    duplicateId: false,
    username: "",
    password: "",
    passwordConfirm: "",
    birthday: "",
    nickname: "",
    introduce: "",
    img: "",
    question: 0,
    answer: "",
    form: "",
  }),
  methods: {
    dateReceive(date) {
      this.birthday = date;
    },
    questionReceive(question) {
      this.question = question;
    },
    imgReceive(img) {
      this.img = img;
    },
    closeDialog() {
      this.isDuplicated = false;
      this.isNotDuplicated = false;
      this.isFailedSignup = false;
      this.dialog = false;
    },
    moveToLogin() {
      this.$router.push("/login");
    },
    checkId() {
      this.form = {
        username: this.username,
      };
      checkDuplicateId(this.form, (res) => {
        if (res.data.result == "중복ID") {
          this.dialog = !this.dialog;
          this.isDuplicated = !this.isDuplicated;
          this.duplicateId = !this.duplicateId;
        } else if (res.data.result == "사용가능ID") {
          this.dialog = !this.dialog;
          this.isNotDuplicated = !this.isNotDuplicated;
          this.duplicateId = false;
        }
      });
    },
    onSubmit() {
      if (this.duplicateId) {
        this.dialog = !this.dialog;
        this.isDuplicated = !this.isDuplicated;
      } else {
        this.form = {
          username: this.username,
          password: this.password,
          birthday: this.birthday,
          nickname: this.nickname,
          introduce: this.introduce,
          img: this.img,
          question: this.question,
          answer: this.answer,
        };
        signUp(this.form, (res) => {
          if (res.status == 200 || res.status == 201) {
            this.dialog = !this.dialog;
            this.isSuccessSignup = !this.isSuccessSignup;
          } else {
            this.dialog = !this.dialog;
            this.isFailedSignup = !this.isFailedSignup;
          }
        });
      }
    },
  },
};
</script>