<template>
  <v-container fluid class="member-kwandong change-password">
    <v-row class="align-center" style="height: 100vh">
      <v-spacer></v-spacer>
      <left-side></left-side>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-spacer></v-spacer>
      <div>
        <v-col>
          <p class="member-kukde-light">비밀번호 변경</p>
          <div class="d-flex align-center flex-column">
            <div style="width: 25vw">
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
                  validationErrors.password !== undefined || this.password == ''
                "
              >
                {{ validationErrors.password }}
              </div>
              <!-- -------------------------------------------------------- -->
              <v-form>
                <v-text-field
                  label="* 새 비밀번호 확인"
                  type="password"
                  autocomplete="off"
                  required
                  @keyup.enter="changePw"
                  :rules="[
                    (v) => !!v || '비밀번호 확인은 필수입니다.',
                    (v) =>
                      (v && v === this.password) ||
                      '입력한 비밀번호와 일치하지 않습니다.',
                  ]"
                >
                </v-text-field>
              </v-form>
              <div v-show="!userId">
                <password-question />
                <v-text-field label="새 비밀번호 찾기 답변"></v-text-field>
              </div>
            </div>
          </div>
          <div class="text-center">
            <v-row class="justify-space-around">
              <v-btn
                color="#fff"
                class="ma-5"
                style="width: 10vw"
                to="/"
                x-large
                >취소</v-btn
              >
              <v-btn
                color="#231815"
                class="ma-5"
                style="width: 10vw"
                dark
                x-large
                type="submit"
                @click="changePw"
                >비밀번호 변경</v-btn
              >
              <!-- Start 비밀번호 변경 모달 -->
              <v-dialog v-model="dialog" width="25vw">
                <message-modal
                  v-if="isSuccessChangePw"
                  body-content="비밀번호가 변경되었습니다.<br /> 로그인 페이지로 이동합니다."
                  @submit="moveToLogin"
                />
                <!-- <message-modal
                  v-if="isFailedSignup"
                  body-content="아이디 중복확인이 필요합니다."
                  @submit="closeDialog"
                /> -->
              </v-dialog>
              <!-- End  비밀번호 변경 모달 -->
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
import MessageModal from "../../components/MessageModal";
import { editPassword } from "@/api/account";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("error", {
      validationErrors: (state) => state.validations,
    }),
  },
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
    question: null,
    answer: "",
    isSuccessChangePw: false,
    dialog: false,
  }),
  methods: {
    moveToLogin() {
      this.$router.push("/login");
    },
    closeDialog() {
      this.isSuccessChangePw = false;
      this.dialog = false;
    },
    changePw() {
      this.form = {
        password: this.password,
        userId: this.userId,
      };
      editPassword(this.form, (res) => {
        if (res.status === 200 || res.status === 201) {
          this.dialog = true;
          this.isSuccessChangePw = true;
        }
      });
    },
  },
};
</script>
