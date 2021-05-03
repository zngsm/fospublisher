<template>
  <v-col>
    <v-container fluid>
      <v-row justify="center">
        <v-menu bottom min-width="12vw" rounded offset-x>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" width="10vh" height="10vh">
              <v-avatar size="10vh">
                <img :src="url" />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center nav-profile">
                <div v-ripple>
                  <v-btn depressed text plain @click="checkPassword">
                    비밀번호 변경</v-btn
                  >
                </div>
                <v-divider class="my-3"></v-divider>
                <div v-ripple>
                  <v-btn depressed text plain @click="logout"> 로그아웃 </v-btn>
                </div>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import { checkUserInfo } from "@/api/account";

export default {
  data: () => ({
    url: "",
  }),
  methods: {
    checkPassword() {
      this.$router.push("/checkPassword");
    },
    logout() {
      localStorage.clear();
      this.checkLogin();
    },
    getUserInfo() {
      checkUserInfo((res) => {
        if (res.status === 200) {
          this.url = res.data.user.img;
        }
      });
    },
    checkLogin() {
      if (localStorage.getItem("userId") === null) {
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>