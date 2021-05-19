import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./auth";
import error from "./error";
import timeline from "./timeline";
import question from "./question";
import book from "./book";

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
  modules: { auth, error, timeline, question, book },
  plugins: [
    createPersistedState({
      paths: ["question", "book"],
    }),
  ],
});
