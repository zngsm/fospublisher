import Vue from 'vue'
import App from './App.vue'

require("jquery");
require("jquery-ui-bundle");
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
