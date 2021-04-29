<template>
  <sequential-entrance fromBottom>
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
                <v-text-field label="아이디"></v-text-field>
                <v-text-field label="비밀번호"></v-text-field>
                <div class="text-center">
                  <v-btn
                    class="font-xl"
                    block
                    color="#231815"
                    style="margin-top: 3vh; margin-bottom: 3vh"
                    dark
                    depressed
                    x-large
                  >
                    로그인
                  </v-btn>
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
  </sequential-entrance>
</template>

<script>
import "../../assets/css/font.css";
import "../../assets/css/member.css";
import LeftSide from "../../components/member/LeftSide";

export default {
  components: { LeftSide },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
