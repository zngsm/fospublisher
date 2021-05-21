export default {
  namespaced: true,
  state: {
    isNew: false,
    todayData: null,
    checkDay: null,
    BookList: false,
  },
  getters: {
    getBookListState(state) {
      return state.BookList
    }
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
    updateBookList(state) {
      if (state.BookList) {
        state.BookList = false;
      } else {
        state.BookList = true;
      }
    },
  },
  actions: {
    updateBookList ({ commit }) {
      commit('updateBookList')
    }
  },
};
