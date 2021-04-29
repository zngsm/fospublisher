import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
});

// 요청 인터셉터 (요청 보내기 전에 수행할 일)
instance.interceptors.request.use(function (config) {
  if (store.state.auth.token !== null) {
    config["headers"] = {
      Authorization: `user $(store.state.auth.token)`,
    };
  }
});

// 응답 인터셉터
instance.interceptors.response.use(
  function (response) {
    store.commit({ type: "error/setValidationError", payload: {} }); // 에러가 없으면 빈값 저장
    return response;
  },
  function (errors) {
    if (errors.response.status === 422) {
      store.commit({
        type: "error/setValidationError",
        data: errors.response.data.data,
        // payload: errors.response.data.data,
      });
    } else {
      return Promise.reject(errors);
    }
  }
);

export default instance;
