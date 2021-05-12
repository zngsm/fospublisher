import { authInstance } from "./index.js";

// 오늘의 질문
function getQuestion(id, success, fail) {
  authInstance
    .get(`api/questions/${id}`, {})
    .then(success)
    .catch(fail);
}

function getSelectedQuesion(id, success, fail) {
  authInstance
    .get(`api/questions/select/${id}`, {})
    .then(success)
    .catch(fail);
}

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
  getQuestion,
  getSelectedQuesion,
  createPastChapter,
  readPastChapter,
  updatePastChapter,
  deletePastChapter,
  readPastBook,
  updatePastBook,
};
