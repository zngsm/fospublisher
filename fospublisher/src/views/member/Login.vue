<template>
  <v-container fluid class="member-kwandong login">
    <v-row class="align-center" style="height: 100vh">
      <v-spacer></v-spacer>
      <left-side></left-side>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-spacer></v-spacer>
      <div>
        <v-col>
          <p class="member-kukde-light">
            역전 출판사에 오신 것을 환영합니다. <br />
            과거를 기록하여 자서전을 내보세요.
          </p>
          <div class="d-flex align-center flex-column">
            <div style="width: 25vw">
              <v-text-field
                color="#231815"
                label="아이디"
                v-model="username"
              ></v-text-field>
              <v-text-field
                label="비밀번호"
                v-model="password"
                type="password"
              ></v-text-field>
              <div class="text-center">
                <v-btn
                  class="font-xl my-7"
                  block
                  color="#231815"
                  dark
                  depressed
                  x-large
                  type="submit"
                  @click="onLogin"
                >
                  로그인
                </v-btn>
                <!-- Start 로그인 모달 -->
                <v-dialog v-model="dialog" width="25vw">
                  <message-modal
                    v-if="isFailedLogin"
                    body-content="아이디와 비밀번호를 확인해주세요."
                    @submit="closeDialog"
                  />
                </v-dialog>
                <!-- End 로그인 모달 -->
              </div>
            </div>
            <v-row>
              <v-btn
                text
                :ripple="false"
                class="text-decoration-underline"
                to="/register"
              >
                회원가입
              </v-btn>
              <v-btn
                text
                :ripple="false"
                class="member-kwandong text-decoration-underline"
                to="/findPassword"
              >
                비밀번호 찾기
              </v-btn>
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
import "../../assets/css/member.css";
import LeftSide from "../../components/member/LeftSide";
import MessageModal from "../../components/MessageModal";
import { userLogin } from "@/api/account";

export default {
  components: { LeftSide, MessageModal },
  data: () => ({
    username: "",
    password: "",
    form: "",
    dialog: false,
    isFailedLogin: false,
  }),
  methods: {
    closeDialog() {
      this.isFailedLogin = false;
      this.dialog = false;
    },
    onLogin() {
      this.form = {
        username: this.username,
        password: this.password,
      };
      userLogin(this.form, (res) => {
        if (res.status == 200 || res.status == 201) {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/main");
        } else {
          this.dialog = !this.dialog;
          this.isFailedLogin = true;
        }
      });
    },
  },
};
</script>
