import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import error from "./error";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: null,
  },
  getters: {
    getUrl: (state) => () => state.url,
  },
  mutations: {
    setUrl(state, url) {
      state.url = url;
    },
  },
  actions: {
    setUrl({ commit }, url) {
      commit("setUrl", { url });
    },
  },
  modules: { auth, error },
});
