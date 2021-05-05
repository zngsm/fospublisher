const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./timelines.ctrl");

router.get("/", verifyToken, ctrl.get_timelines_read);

router.get("/edit", verifyToken, ctrl.get_timelines_edit_mode);

router.put("/", verifyToken, ctrl.put_timelines_edit);

module.exports = router;
