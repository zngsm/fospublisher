import { authInstance } from "./index.js";

function readTimeline(success, fail) {
  authInstance
    .get("api/timelines/", {})
    .then(success)
    .catch(fail);
}

export { readTimeline };
