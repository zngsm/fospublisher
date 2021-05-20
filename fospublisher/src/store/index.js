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
    isQuestion: true,
    checked: false,
  },
  getters: {
    getUrl: (state) => () => state.url,
    getIsQuestion: (state) => () => state.isQuestion,
    getChecked: (state) => () => state.checked
  },
  mutations: {
    setUrl(state, url) {
      state.url = url;
    },
    setIsQuestion(state, isQuestion) {
      state.isQuestion = isQuestion;
    },
    setChecked(state, checked) {
      state.checked = checked;
    }
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
