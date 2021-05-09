export default {
  namespaced: true,
  state: {
    todayQuestion: "",
  },
  mutations: {
    setQuestion(state, question) {
      state.todayQuestion = question;
      console.log(state.todayQuestion);
    },
  },
  actions: {},
};
