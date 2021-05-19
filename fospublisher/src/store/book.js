export default {
  namespaced: true,
  state: {
    isNew: false,
    todayData: null,
    checkDay: null,
  },
  mutations: {
    checkNew(state, status) {
      state.isNew = status;
    },
    todayData(state, status) {
      state.todayData = status;
    },
    saveDay(state, status) {
      state.checkDay = status;
    },
  },
  actions: {},
};
