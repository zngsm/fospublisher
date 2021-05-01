import { authInstance } from "./index.js";

// 챕터 CRUD
function createPastChapter(data, success, fail) {
  authInstance
    .post("api/pasts/", data, {})
    .then(success)
    .catch(fail);
}

function readPastChapter(chapterId, success, fail) {
  authInstance
    .get(`api/pasts/${chapterId}`, {})
    .then(success)
    .catch(fail);
}

function updatePastChapter(chapterId, data, success, fail) {
  authInstance
    .put(`api/pasts/${chapterId}`, data, {})
    .then(success)
    .catch(fail);
}

function deletePastChapter(chapterId, success, fail) {
  authInstance
    .delete(`api/pasts/${chapterId}`, {})
    .then(success)
    .catch(fail);
}

// 책 RU
function readPastBook(success, fail) {
  authInstance
    .get("api/pasts/", {})
    .then(success)
    .catch(fail);
}

function updatePastBook(data, success, fail) {
  authInstance
    .put("api/pasts/", data, {})
    .then(success)
    .catch(fail);
}

export {
  createPastChapter,
  readPastChapter,
  updatePastChapter,
  deletePastChapter,
  readPastBook,
  updatePastBook,
};
