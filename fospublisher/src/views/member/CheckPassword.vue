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
        <div>
          <p class="page-title-bold">비밀번호 확인</p>
          <br />
          <div class="d-flex align-center flex-column">
            <div class="member-input-size">
              <v-form ref="form" v-on:submit.prevent="changePassword">
                <v-text-field
                  label="현재 비밀번호"
                  v-model.lazy="password"
                  type="password"
                  autocomplete="off"
                  @keyup.enter="changePassword"
                  :rules="[(v) => !!v || '현재 비밀번호는 필수입니다.']"
                >
                </v-text-field>
              </v-form>
            </div>
            <div class="text-center">
              <v-row class="justify-center">
                <v-btn color="#fff" class="ma-5 member-btn-size" large to="/"
                  >취소</v-btn
                >
                <v-btn
                  color="#231815"
                  class="ma-5 member-btn-size"
                  dark
                  large
                  type="submit"
                  @click="changePassword"
                  >비밀번호 변경</v-btn
                >
                <!-- Start 비밀번호 확인 모달 -->
                <v-dialog v-model="dialog" width="300px">
                  <message-modal
                    v-if="noData"
                    body-content="비밀번호를 다시 확인해주세요."
                    @submit="closeDialog"
                    v-click-outside="closeDialog"
                  />
                </v-dialog>
                <!-- End  비밀번호 확인 모달 -->
              </v-row>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import "../../assets/css/member.css";
import MessageModal from "../../components/MessageModal";
import { passwordConfirm } from "@/api/account";

export default {
  components: { MessageModal },
  data: () => ({
    password: "",
    form: "",
    dialog: false,
    noData: false,
  }),
  methods: {
    // 유효성 검사
    validate() {
      this.$refs.form.validate();
    },
    // 모달 닫기
    closeDialog() {
      this.noData = false;
      this.dialog = false;
    },
    // 패스워드 확인
    changePassword() {
      this.validate();
      this.form = {
        password: this.password,
      };
      if (this.password !== "") {
        passwordConfirm(
          this.form,
          (res) => {
            if (res.data.result === "OK") {
              localStorage.setItem("tempAccept", "accept");
              this.$router.push("/changePassword");
            }
          },
          () => {
            this.dialog = true;
            this.noData = true;
          }
        );
      }
    },
  },
};
</script>
