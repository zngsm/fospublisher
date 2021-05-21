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
        <div class="text-center">
          <p class="page-title-bold">
            역전 출판사에 오신 것을 환영합니다. <br />
            과거를 기록하여 자서전을 내보세요.
          </p>
          <br />
          <div class="d-flex align-center flex-column">
            <div class="member-input-size">
              <v-text-field
                label="아이디"
                v-model="username"
                @keyup.enter="onLogin"
              ></v-text-field>
              <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
              <div
                class="validation"
                v-if="
                  validationErrors.username !== undefined && this.username == ''
                "
              >
                {{ validationErrors.username }}
              </div>
              <!-- -------------------------------------------------------- -->
              <v-text-field
                label="비밀번호"
                v-model.lazy="password"
                type="password"
                autocomplete="off"
                @keyup.enter="onLogin"
              >
              </v-text-field>
              <!-- validation에 에러가 존재한다면, 해당 key에 해당하는 value(메세지) 보여주기 -->
              <div
                class="validation"
                v-if="
                  validationErrors.password !== undefined || this.password == ''
                "
              >
                {{ validationErrors.password }}
              </div>
              <!-- -------------------------------------------------------- -->
              <div class="text-center">
                <v-btn
                  class="font-xl my-7"
                  block
                  color="#231815"
                  dark
                  depressed
                  x-large
                  @click="onLogin"
                >
                  로그인
                </v-btn>
                <!-- Start 로그인 모달 -->
                <v-dialog v-model="dialog" width="300px">
                  <message-modal
                    v-if="isFailedLogin"
                    body-content="아이디와 비밀번호를 확인해주세요."
                    @submit="closeDialog"
                    v-click-outside="closeDialog"
                  />
                </v-dialog>
                <!-- End 로그인 모달 -->
              </div>
            </div>
            <v-row class="justify-center">
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
                class="text-decoration-underline"
                to="/findPassword"
              >
                비밀번호 찾기
              </v-btn>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/member.css";
import MessageModal from "../../components/MessageModal";
import { mapState } from "vuex";
import { userLogin } from "@/api/account";

export default {
  components: { MessageModal },
  data: () => ({
    username: "",
    password: "",
    dialog: false,
    isFailedLogin: false,
  }),
  computed: {
    // vuex에서 validation가져오기, 값이 있으면 에러존재
    ...mapState({
      validationErrors: (state) => state.error.validations,
    }),
    // 폼 만들어주기
    form() {
      return {
        username: this.username,
        password: this.password,
      };
    },
  },
  methods: {
    // 모달 닫기
    closeDialog() {
      this.isFailedLogin = false;
      this.dialog = false;
    },
    // 메인페이지로 이동
    moveToMain() {
      this.$router.replace("/main");
    },
    // 로그인
    onLogin() {
      userLogin(
        this.form,
        (res) => {
          if (res.status === 200 || res.status === 201) {
            this.$store.commit("auth/setToken", res.data.token);
            this.$store.commit("auth/setRefreshToken", res.data.refreshToken);
            this.$store.commit("auth/setUserId", res.data.userId);
            this.moveToMain();
          } else {
            console.log("로그인 에러");
          }
        },
        () => {
          this.dialog = true;
          this.isFailedLogin = true;
        }
      );
    },
  },
  created() {
    if (localStorage.getItem("userId")) {
      this.moveToMain();
    }
  },
};
</script>
