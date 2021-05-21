export default {
  namespaced: true,
  state: {
    edit: false,
  },
  mutations: {
    setEditMode(state, status) {
      state.edit = status;
    },
  },
  actions: {},
};
