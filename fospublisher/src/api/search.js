import { authInstance } from "./index.js";

// 유저 팔로우 하기
function searchUserId(user, success, fail) {
  authInstance
    .get(`api/search/user/${user}`)
    .then(success)
    .catch(fail);
}

function getAuthorInfo(userPk, success, fail) {
  authInstance
    .get(`api/search/userinfo/${userPk}`)
    .then(success)
    .catch(fail);
}

export { searchUserId, getAuthorInfo };
