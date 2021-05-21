const { Router } = require("express");
const { verifyToken } = require("../tokens/authorization");
const router = Router();
const ctrl = require("./search.ctrl");

router.get("/user/:user", verifyToken, ctrl.search_username);

router.get("/userinfo/:userId", verifyToken, ctrl.search_userinfo);

module.exports = router;
