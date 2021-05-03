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
          <p class="member-kukde-light">비밀번호 확인</p>
          <div class="d-flex align-center flex-column">
            <div style="width: 25vw">
              <v-form ref="form">
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
                    @click="changePassword"
                    >비밀번호 변경</v-btn
                  >
                  <!-- Start 비밀번호 확인 모달 -->
                  <v-dialog v-model="dialog" width="25vw">
                    <message-modal
                      v-if="noData"
                      body-content="비밀번호를 다시 확인해주세요."
                      @submit="closeDialog"
                    />
                  </v-dialog>
                  <!-- End  비밀번호 확인 모달 -->
                </v-row>
              </div>
            </div>
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
import MessageModal from "../../components/MessageModal";
import { passwordConfirm } from "@/api/account";

export default {
  components: { LeftSide, MessageModal },
  data: () => ({
    password: "",
    form: "",
    dialog: false,
    noData: false,
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    closeDialog() {
      this.noData = false;
      this.dialog = false;
    },
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
