const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./questions.ctrl");

router.get("/:id", verifyToken, ctrl.get_question);

module.exports = router;
