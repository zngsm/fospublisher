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
          <v-row class="justify-center" style="height: 80vh">
            <v-col cols="6" class="d-flex flex-column">
              <p class="member-kukde-light">회원가입</p>
              <v-row class="justify-center align-content-around">
                <v-col class="d-flex flex-column justify-space-around">
                  <div>
                    <v-row class="align-center" no-gutters dense>
                      <v-text-field label="* 아 이 디" v-model="username">
                      </v-text-field>
                    </v-row>
                    <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                    <div
                      class="validation-kwandong"
                      v-if="
                        validationErrors.username !== undefined &&
                        this.username == ''
                      "
                    >
                      {{ validationErrors.username }}
                    </div>
                    <div class="validation-kwandong" v-if="isDuplicated">
                      중복된 아이디가 존재합니다.
                    </div>
                    <!-- -------------------------------------------------------- -->
                  </div>
                  <div>
                    <v-text-field
                      label="* 닉 네 임"
                      v-model="nickname"
                    ></v-text-field>
                    <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                    <div
                      class="validation-kwandong"
                      v-if="
                        validationErrors.nickname !== undefined &&
                        this.nickname == ''
                      "
                    >
                      {{ validationErrors.nickname }}
                    </div>
                    <!-- -------------------------------------------------------- -->
                  </div>
                  <div>
                    <v-text-field
                      label="* 비 밀 번 호"
                      v-model.lazy="password"
                      type="password"
                      autocomplete="off"
                    >
                    </v-text-field>
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
                    <v-form ref="form">
                      <v-text-field
                        label="* 비 밀 번 호 확 인"
                        type="password"
                        autocomplete="off"
                        v-model.lazy="passwordConfirm"
                      >
                      </v-text-field>
                    </v-form>
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
                  <div>
                    <v-row no-gutters>
                      <password-question is-required @input="questionReceive" />
                    </v-row>
                    <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                    <div
                      class="validation-kwandong"
                      v-if="
                        validationErrors.question !== undefined &&
                        this.question == ''
                      "
                    >
                      {{ validationErrors.question }}
                    </div>
                    <!-- -------------------------------------------------------- -->
                  </div>
                  <div>
                    <v-text-field label="* 비밀번호 찾기 답변" v-model="answer">
                    </v-text-field>
                    <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                    <div
                      class="validation-kwandong"
                      v-if="
                        validationErrors.answer !== undefined &&
                        this.answer == ''
                      "
                    >
                      {{ validationErrors.answer }}
                    </div>
                    <!-- -------------------------------------------------------- -->
                  </div>
                  <div>
                    <date-picker @birthday="dateReceive" />
                    <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
                    <div
                      class="validation-kwandong"
                      v-if="
                        validationErrors.birthday !== undefined &&
                        this.birthday == ''
                      "
                    >
                      {{ validationErrors.birthday }}
                    </div>
                    <!-- -------------------------------------------------------- -->
                  </div>
                </v-col>
              </v-row>
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
                  @click="onSubmit"
                >
                  회원가입
                </v-btn>
                <!-- Start 회원가입 모달 -->
                <v-dialog v-model="dialog" width="25vw">
                  <message-modal
                    v-if="isSuccessSignup"
                    body-content="회원가입에 성공했습니다. <br /> 로그인 페이지로 이동합니다."
                    @submit="moveToLogin"
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
import DatePicker from "../../components/member/DatePicker.vue";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
import AvatarSelect from "../../components/member/AvatarSelect.vue";
import MessageModal from "../../components/MessageModal";
import { checkDuplicateId, signUp } from "../../api/account";
import { mapState } from "vuex";

export default {
  components: { DatePicker, PasswordQuestion, AvatarSelect, MessageModal },
  data: () => ({
    dialog: false,
    isSuccessSignup: false,
    isDuplicated: false,
    username: "",
    password: "",
    passwordConfirm: "",
    birthday: "",
    nickname: "",
    introduce: "",
    img: "",
    question: "",
    answer: "",
    form: "",
  }),
  computed: {
    ...mapState("error", {
      validationErrors: (state) => state.validations,
    }),
  },
  methods: {
    // 생일 component에서 받아오기
    dateReceive(date) {
      this.birthday = date;
    },
    // 질문 component에서 받아오기
    questionReceive(question) {
      this.question = question;
    },
    // 이미지 component에서 받아오기
    imgReceive(img) {
      this.img = img;
    },
    // 모달 닫을 때
    closeDialog() {
      this.isDuplicated = false;
      this.isSuccessSignup = false;
      this.dialog = false;
    },
    // 페이지 이동
    moveToLogin() {
      this.$router.push("/login");
    },
    // 회원가입 버튼 클릭
    onSubmit() {
      this.checkId();
    },
    // 아이디 체크
    checkId() {
      this.form = {
        username: this.username,
      };
      checkDuplicateId(
        this.form,
        (res) => {
          if (res.data.result === "중복ID") {
            this.isDuplicated = true;
          } else if (res.data.result === "사용가능ID") {
            this.isDuplicated = false;
            this.signUp();
          }
        },
        () => {
          return;
        }
      );
    },
    // 가입시작
    signUp() {
      this.form = {
        username: this.username,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        birthday: this.birthday,
        nickname: this.nickname,
        introduce: this.introduce,
        img: this.img,
        question: this.question,
        answer: this.answer,
      };
      signUp(
        this.form,
        (res) => {
          if (res.status === 200 || res.status === 201) {
            this.dialog = true;
            this.isSuccessSignup = true;
          }
        },
        () => {
          return;
        }
      );
    },
  },
};
</script>
