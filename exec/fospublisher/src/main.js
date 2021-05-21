import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import SequentialEntrance from "vue-sequential-entrance";
import "vue-sequential-entrance/vue-sequential-entrance.css";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(SequentialEntrance);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
