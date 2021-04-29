<template>
  <sequential-entrance fromBottom>
    <v-container fluid class="member-kwandong find-password">
      <v-row class="align-center" style="height: 100vh">
        <v-spacer></v-spacer>
        <left-side></left-side>
        <v-spacer></v-spacer>
        <v-divider vertical></v-divider>
        <v-spacer></v-spacer>
        <div>
          <v-col>
            <p class="member-kukde-light">비밀번호 찾기</p>
            <div class="d-flex align-center flex-column">
              <div style="width: 25vw">
                <v-text-field label="아이디"></v-text-field>
                <v-select label="비밀번호 찾기 질문"></v-select>
                <v-text-field label="비밀번호 찾기 답변"></v-text-field>
                <div class="text-center">
                  <v-btn
                    block
                    color="#231815"
                    style="margin-top: 2rem; margin-bottom: 2rem"
                    dark
                    depressed
                    to="/changePassword"
                    x-large
                    >비밀번호 찾기</v-btn
                  >
                </div>
              </div>
              <v-row>
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
          </v-col>
        </div>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </sequential-entrance>
</template>

<script>
import "../../assets/css/font.css";
import LeftSide from "../../components/member/LeftSide";
export default {
  components: { LeftSide },
};
</script>
