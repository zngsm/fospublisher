import { authInstance } from "./index.js";

// 챕터 CRUD
function createFutureChapter(data, success, fail) {
  authInstance
    .post("api/futures/", data, {})
    .then(success)
    .catch(fail);
}

function readFutureChapter(chapterId, success, fail) {
  authInstance
    .get(`api/futures/${chapterId}`, {})
    .then(success)
    .catch(fail);
}

function updateFutureChapter(chapterId, data, success, fail) {
  authInstance
    .put(`api/futures/${chapterId}`, data, {})
    .then(success)
    .catch(fail);
}

function deleteFutureChapter(chapterId, success, fail) {
  authInstance
    .delete(`api/futures/${chapterId}`, {})
    .then(success)
    .catch(fail);
}

// 책 RU
function readFutureBook(success, fail) {
  authInstance
    .get("api/futures/", {})
    .then(success)
    .catch(fail);
}

function updateFutureBook(data, success, fail) {
  authInstance
    .put("api/futures/", data, {})
    .then(success)
    .catch(fail);
}

// 표지 정보
function getCoverInfo(success, fail) {
  authInstance
    .get("api/futures/cover/", {})
    .then(success)
    .catch(fail);
}

function checkFuture(data, success, fail) {
  authInstance
    .post("api/futures/check", data, {})
    .then(success)
    .catch(fail);
}

export {
  createFutureChapter,
  readFutureChapter,
  updateFutureChapter,
  deleteFutureChapter,
  readFutureBook,
  updateFutureBook,
  getCoverInfo,
  checkFuture,
};
