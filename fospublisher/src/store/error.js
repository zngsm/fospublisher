export default {
  namespaced: true,
  state: {
    validation: {},
  },
  mutation: {
    setValidationError(state, error) {
      state.validation = error;
    },
  },
  actions: {},
};
