const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./pasts.ctrl");

router.post("/", verifyToken, ctrl.post_pasts_write);

router.get("/", verifyToken, ctrl.get_pasts_read);

router.put("/:chapter_id", verifyToken, ctrl.put_pasts_edit);

router.delete("/:chapter_id", verifyToken, ctrl.delete_pasts_delete);

router.get("/:chapter_id", verifyToken, ctrl.get_pasts_chapter_read);

module.exports = router;
