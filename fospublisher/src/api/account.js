import { createInstance } from "./index.js";

const instance = createInstance();

function userLogin(user, success, fail) {
  instance
    .post(`api/accounts/login/`, user)
    .then(success)
    .catch(fail);
}

export { userLogin };
