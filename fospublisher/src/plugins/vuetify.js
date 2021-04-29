import Vue from "vue";
import Vuetify from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "vuetify/dist/vuetify.min.css";
import "../assets/css/font.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi" || "md",
  },
  theme: {
    themes: {
      light: {
        background: "#F5F4EE",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
