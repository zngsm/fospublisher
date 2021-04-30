<template>
  <sequential-entrance fromBottom>
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
                <v-text-field label="새 비밀번호"></v-text-field>
                <v-text-field label="새 비밀번호 확인"></v-text-field>
                <password-question />
                <v-text-field label="새 비밀번호 찾기 답변"></v-text-field>
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
                  >비밀번호 변경</v-btn
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
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
export default {
  components: { LeftSide, PasswordQuestion },
};
</script>
