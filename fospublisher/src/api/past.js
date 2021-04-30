import { authorizationInstance } from "./index.js";

const instance = authorizationInstance();
// const instance = createInstance();

function pastWrite(article, success, fail) {
  instance
    .post("api/pasts/", article, {})
    .then(success)
    .catch(fail);
}

function pastRead(article, success, fail) {
  instance
    .get("api/pasts/", article, {})
    .then(success)
    .catch(fail);
}

export { pastWrite, pastRead };
