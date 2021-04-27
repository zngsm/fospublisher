const { Router } = require("express");
const router = Router();
const ctrl = require("./accounts.ctrl");
const { verifyToken } = require('../tokens/authorization');

router.post("/signup", ctrl.post_accounts_signup);

router.post("/login", ctrl.post_accounts_login);

router.put("/user-edit", verifyToken, ctrl.put_accounts_user_edit);

router.post("/password-confirm", verifyToken, ctrl.post_accounts_password_confirm);

router.put("/password-edit", ctrl.put_accounts_password_edit);

router.put("/password-question-edit", verifyToken, ctrl.put_accounts_password_question_edit);

router.post("/question-answer-confirm", ctrl.post_accounts_question_answer_confirm);

router.post("/username-confirm", ctrl.post_accounts_username_confirm);

router.get("/user-info", verifyToken, ctrl.get_accounts_user_info);

router.post("/token", ctrl.post_accounts_token);

module.exports = router;