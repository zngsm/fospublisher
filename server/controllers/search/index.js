const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./search.ctrl");

router.get("/:user", verifyToken, ctrl.search_user);

module.exports = router;
