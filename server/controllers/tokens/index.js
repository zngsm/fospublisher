const { Router } = require("express");
const router = Router();
const ctrl = require("./tokens.ctrl");

router.post("/access", ctrl.post_tokens_access);

router.post("/validation", ctrl.post_tokens_validation);

router.post("/refresh", ctrl.post_tokens_refresh);

module.exports = router;