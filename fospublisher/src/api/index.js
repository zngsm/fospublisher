import axios from "axios";
import store from "@/store";
import { API_BASE_URL } from "../config";

// token이 필요없는 요청 및 응답 interceptor (에러 저장)
const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.response.use(
  function(response) {
    store.commit("error/setValidationError", {});
    return response;
  },

  function(error) {
    // vuex에 있는 validation에 error넣어주기
    if (error.response.status === 422) {
      store.commit("error/setValidationError", error.response.data.data);
    } else {
      return Promise.reject(error);
    }
  }
);

// token이 필요한 요청 및 interceptor (토큰 저장)
const authInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

authInstance.interceptors.request.use(function(config) {
  if (localStorage.getItem("token")) {
    config["headers"] = {
      user: `${localStorage.getItem("token")}`,
    };
  }
  return config;
});

authInstance.interceptors.response.use(
  function(response) {
    store.commit("error/setValidationError", {});

    return response;
  },
  function(error) {
    // vuex에 있는 validation에 error넣어주기
    if (error.response.status === 422) {
      store.commit("error/setValidationError", error.response.data.data);
    } else {
      return Promise.reject(error);
    }
  }
);
// export { createInstance, authorizationInstance };
export { instance, authInstance };
