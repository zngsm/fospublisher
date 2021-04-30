<template>
  <sequential-entrance fromBottom>
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
                  <v-text-field label="* 아 이 디"></v-text-field>
                  <v-btn width="5vw" small dark color="#231815">
                    중복확인
                  </v-btn>
                </v-row>
                <v-text-field label="* 비 밀 번 호"></v-text-field>
                <v-text-field label="* 비 밀 번 호 확 인"></v-text-field>
                <data-picker />
                <v-row no-gutters>
                  <password-question is-required />
                </v-row>
                <v-text-field label="* 비밀번호 찾기 답변"></v-text-field>
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
                <avatar-select />
                <v-textarea
                  clearable
                  auto-grow
                  outlined
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
                  >
                    회원가입
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </sequential-entrance>
</template>

<script>
import "../../assets/css/font.css";
import DataPicker from "../../components/member/DataPicker.vue";
import PasswordQuestion from "../../components/member/PasswordQuestion.vue";
import AvatarSelect from "../../components/member/AvatarSelect.vue";

export default {
  components: { DataPicker, PasswordQuestion, AvatarSelect },
};
</script>