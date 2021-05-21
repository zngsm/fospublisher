import { authInstance, instance } from "./index.js";

// 로그인
function userLogin(user, success, fail) {
  instance
    .post(`api/accounts/login`, user)
    .then(success)
    .catch(fail);
}

// 프로필 사진 변경
function uploadProfile(imgFile, success, fail) {
  instance
    .post(`api/images/upload/`, imgFile)
    .then(success)
    .catch(fail);
}

// 회원가입
function signUp(user, success, fail) {
  instance
    .post(`api/accounts/signup/`, user)
    .then(success)
    .catch(fail);
}

// 회원정보 변경
function editUser(user, success, fail) {
  authInstance
    .put(`api/accounts/user-edit/`, user)
    .then(success)
    .catch(fail);
}

// 비밀번호 확인
function passwordConfirm(user, success, fail) {
  authInstance
    .post(`api/accounts/password-confirm/`, user)
    .then(success)
    .catch(fail);
}

// 비밀번호만 변경
function editPassword(user, success, fail) {
  instance
    .put(`api/accounts/password-edit/`, user)
    .then(success)
    .catch(fail);
}

// 비밀번호+질문 변경
function editQuestion(user, success, fail) {
  authInstance
    .put(`api/accounts/password-question-edit/`, user)
    .then(success)
    .catch(fail);
}

// 질문 답변 확인
function confirmQuestion(user, success, fail) {
  instance
    .post(`api/accounts/question-answer-confirm/`, user)
    .then(success)
    .catch(fail);
}

// 아이디 중복 체크
function checkDuplicateId(user, success, fail) {
  instance
    .post(`api/accounts/username-confirm/`, user)
    .then(success)
    .catch(fail);
}

// 유저 정보확인
function checkUserInfo(success, fail) {
  authInstance
    .get(`api/accounts/user-info/`)
    .then(success)
    .catch(fail);
}

// 리프레시토큰
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
