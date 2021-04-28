const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./timelines.ctrl");

router.get("/", verifyToken, ctrl.get_timelines_read);

router.put("/", verifyToken, ctrl.put_timelines_edit);

module.exports = router;
