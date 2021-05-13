const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./search.ctrl");

router.get("/user/:user", verifyToken, ctrl.search_username);

module.exports = router;
