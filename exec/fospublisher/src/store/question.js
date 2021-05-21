export default {
  namespaced: true,
  state: {
    todayQuestion: "",
    todayQuestionId: 1,
  },
  mutations: {
    setQuestion(state, question) {
      state.todayQuestion = question;
    },
    setQuestionId(state, id) {
      state.todayQuestionId = id;
    },
  },
};
