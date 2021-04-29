<template>
  <sequential-entrance fromBottom>
    <v-container fluid class="member-kwandong">
      <v-row style="height: 100vh">
        <v-col cols="6">
          <v-col cols="2">
            <v-img contain src="../../assets/logo.png" alt="역전출판사"></v-img>
          </v-col>
          <v-row class="justify-center">
            <v-col cols="4" class="align-content-space-between">
              <v-text-field label="* 아 이 디"></v-text-field>
              <v-text-field label="* 비 밀 번 호"></v-text-field>
              <v-text-field label="* 비 밀 번 호 확 인"></v-text-field>
              <data-picker />
              <v-select label="* 비밀번호 찾기 질문"></v-select>
              <v-text-field label="* 비밀번호 찾기 답변"></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="6"> </v-col>
      </v-row>
    </v-container>
  </sequential-entrance>
</template>

<script>
import "../../assets/css/font.css";
import DataPicker from "../../components/member/DataPicker.vue";
export default {
  components: { DataPicker },
};
</script>
