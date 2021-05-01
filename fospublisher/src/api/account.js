import { createInstance } from "./index.js";

const instance = createInstance();

function userLogin(user, success, fail) {
  instance
    .post(`api/accounts/login/`, user)
    .then(success)
    .catch(fail);
}
function uploadProfile(imgFile, success, fail) {
  instance
    .post(`api/images/upload/`, imgFile)
    .then(success)
    .catch(fail);
}
function signUp(user, success, fail) {
  instance
    .post(`api/accounts/signup/`, user)
    .then(success)
    .catch(fail);
}
function editUser(user, success, fail) {
  instance
    .put(`api/accounts/user-edit/`, user)
    .then(success)
    .catch(fail);
}
function passwordConfirm(user, success, fail) {
  instance
    .post(`api/accounts/password-confirm/`, user)
    .then(success)
    .catch(fail);
}
function editPassword(user, success, fail) {
  instance
    .put(`api/accounts/password-edit/`, user)
    .then(success)
    .catch(fail);
}
function editQuestion(user, success, fail) {
  instance
    .put(`api/accounts/password-question-edit/`, user)
    .then(success)
    .catch(fail);
}
function confirmQuestion(user, success, fail) {
  instance
    .post(`api/accounts/question-answer-confirm/`, user)
    .then(success)
    .catch(fail);
}
function checkDuplicateId(user, success, fail) {
  instance
    .post(`api/accounts/username-confirm/`, user)
    .then(success)
    .catch(fail);
}
function checkUserInfo(success, fail) {
  instance
    .get(`api/accounts/user-info/`)
    .then(success)
    .catch(fail);
}
function checkToken(user, success, fail) {
  instance
    .post(`api/accounts/token/`, user)
    .then(success)
    .catch(fail);
}

export {
  userLogin,
  uploadProfile,
  signUp,
  editUser,
  passwordConfirm,
  editPassword,
  editQuestion,
  confirmQuestion,
  checkDuplicateId,
  checkUserInfo,
  checkToken,
};
