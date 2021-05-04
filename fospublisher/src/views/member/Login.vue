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
            <p class="member-kukde-light">
              역전 출판사에 오신 것을 환영합니다. <br />
              과거를 기록하여 자서전을 내보세요.
            </p>
            <div class="d-flex align-center flex-column">
              <div style="width: 25vw">
                <v-text-field
                  label="아이디"
                  v-model="username"
                  @keyup.enter="onLogin"
                ></v-text-field>
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
                <!-- -------------------------------------------------------- -->
                <v-form>
                  <v-text-field
                    label="비밀번호"
                    v-model.lazy="password"
                    type="password"
                    autocomplete="off"
                    @keyup.enter="onLogin"
                  >
                  </v-text-field>
                </v-form>
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
                  class="member-kwandong text-decoration-underline"
                  to="/findPassword"
                >
                  비밀번호 찾기
                </v-btn>
              </v-row>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/font.css";
import LeftSide from "../../components/member/LeftSide";
import MessageModal from "../../components/MessageModal";
import { mapState } from "vuex";
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
      userLogin(
        this.form,
        (res) => {
          if (res.status === 200 || res.status === 201) {
            this.$store.commit("auth/setToken", res.data.token);
            this.$store.commit("auth/setRefreshToken", res.data.refreshToken);
            this.$store.commit("auth/setUserId", res.data.userId);
            this.$router.push("/main");
          }
        },
        () => {
          this.dialog = true;
          this.isFailedLogin = true;
        }
      );
    },
  },
  // vuex에서 validation가져오기, 값이 있으면 에러존재
  computed: {
    ...mapState({
      validationErrors: (state) => state.error.validations,
    }),
  },
};
</script>
