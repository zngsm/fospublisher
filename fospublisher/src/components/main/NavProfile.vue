<template>
  <v-col>
    <v-container fluid>
      <v-row justify="center">
        <v-menu bottom min-width="60px" rounded offset-x>
          <template v-slot:activator="{ on }">
            <v-btn fab icon v-on="on" width="100px" height="100px" id="test">
              <v-avatar size="100px">
                <img :src="url" style="object-fit: cover" />
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
    // 패스워드 변경 페이지로 이동
    checkPassword() {
      this.$router.push("/checkPassword");
    },
    // 로그아웃
    logout() {
      localStorage.clear();
      this.checkLogin();
    },
    // 유저정보 불러오기
    getUserInfo() {
      checkUserInfo((res) => {
        if (res.status === 200) {
          this.url = res.data.user.img;
        }
      });
    },
    // 로그인 상태 확인
    checkLogin() {
      if (localStorage.getItem("userId") === null) {
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.$store.watch(this.$store.getters.getUrl, (url) => {
      this.url = url;
    });
  },
};
</script>

<style scoped>
#test {
  object-fit: cover;
}
</style>
