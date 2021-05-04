<template>
  <v-app>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <sequential-entrance fromBottom>
        <router-view />
      </sequential-entrance>
    </v-main>
  </v-app>
</template>

<script>
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
      checkToken(this.form, (res) => {
        if (res.status === 201) {
          this.$store.commit("auth/setToken", res.data.token);
          this.$store.commit("auth/setRefreshToken", res.data.refreshToken);
          // this.$router.push("/main");
        }
      });
    }
  },
};
</script>

<style>
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>