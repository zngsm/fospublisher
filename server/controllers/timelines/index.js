const { Router } = require("express");
const router = Router();
const ctrl = require("./timelines.ctrl");

router.get("/", ctrl.get_timelines_read);

router.put("/", ctrl.put_timelines_edit);

module.exports = router;