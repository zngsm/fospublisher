import { authInstance } from "./index.js";

// 유저 팔로우 하기
function followUser(user, success, fail) {
  authInstance
    .post(`api/follow`, user)
    .then(success)
    .catch(fail);
}

// 유저 팔로우 끊기
function unfollowUser(userId, success, fail) {
  authInstance
    .delete(`api/follow/${userId}`, {})
    .then(success)
    .catch(fail);
}

// 맞팔된 유저들의 정보와 책 커버 리스트
function getEachFollowerList(success, fail) {
  authInstance
    .get(`api/follow/list`)
    .then(success)
    .catch(fail);
}

// 맞팔된 유저들 Id 로 요청보낼시 책 디테일 정보
function getEachFollowerBook(userId, success, fail) {
  authInstance
    .get(`api/follow/book/${userId}`)
    .then(success)
    .catch(fail);
}

// 팔로우중인 리스트(맞팔여부/팔로우신청 시간 포함)
function getFollowingList(success, fail) {
  authInstance
    .get(`api/follow/list/following`)
    .then(success)
    .catch(fail);
}

// 나를 팔로우한 리스트(맞팔여부/팔로우신청온 시간 포함)
function getFollowerList(success, fail) {
  authInstance
    .get(`api/follow/list/follower`)
    .then(success)
    .catch(fail);
}

export {
  followUser,
  unfollowUser,
  getEachFollowerList,
  getEachFollowerBook,
  getFollowingList,
  getFollowerList,
};
