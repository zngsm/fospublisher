<template>
  <v-app>
    <v-main>
      <sequential-entrance fromBottom>
        <router-view :key="$route.fullPath" />
      </sequential-entrance>
    </v-main>
  </v-app>
</template>

<script>
import "@/assets/css/root.css";
import { checkToken } from "@/api/account";

export default {
  name: "App",

  data: () => ({
    form: "",
  }),
  created() {
    if (localStorage.getItem("userId")) {
      this.form = {
        refreshToken: localStorage.getItem("refreshToken"),
        userId: localStorage.getItem("userId"),
      };
      checkToken(
        this.form,
        (res) => {
          if (res.status === 201) {
            this.$store.commit("auth/setToken", res.data.token);
            this.$store.commit("auth/setRefreshToken", res.data.refreshToken);
          }
        },
        (err) => {
          if (err.response.status === 404) {
            localStorage.clear();
            setTimeout(() => {
              this.$router.replace("/login");
            }, 200);
          }
        }
      );
    }
  },
};
</script>

<style>
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
