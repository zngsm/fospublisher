import Vue from 'vue';
import Dev from './serve.vue';
require("jquery");
require("jquery-ui-bundle");

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
