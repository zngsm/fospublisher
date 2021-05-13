const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./questions.ctrl");

router.get("/:id", ctrl.get_question);

router.get("/select/:id", ctrl.get_selected_question);

module.exports = router;
