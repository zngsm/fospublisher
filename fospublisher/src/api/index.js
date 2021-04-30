import axios from "axios";
import { API_BASE_URL } from "../config";

// const dotenv = require("dotenv");
// dotenv.config();

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true,
  });
  return instance;
}

function authorizationInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      user: `${localStorage.getItem("token")}`,
    },
    // headers : {
    //   'Authorization' : `jwt ${localStorage.getItem('jwt')}`
    // }
    withCredentials: true,
  });
  return instance;
}
export { createInstance, authorizationInstance };
