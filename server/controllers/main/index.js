const { Router } = require("express");
const router = Router();
const ctrl = require("./main.ctrl");

router.get("/", ctrl.get_main_index);

module.exports = router;
