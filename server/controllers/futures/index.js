const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./futures.ctrl");

router.post("/", verifyToken, ctrl.post_futures_write);

router.put("/:chapter_id", verifyToken, ctrl.put_futures_edit);

router.delete("/:chapter_id", verifyToken, ctrl.delete_futures_delete);

router.get("/:chapter_id", verifyToken, ctrl.get_futures_chapter_read);

router.get("/", verifyToken, ctrl.get_futures_read);

router.put("/", verifyToken, ctrl.put_futures_read);

module.exports = router;
