const { Router } = require("express");
const router = Router();
const ctrl = require("./accounts.ctrl");

router.post("/signup", ctrl.post_accounts_signup);

router.post("/login", ctrl.post_accounts_login);

router.put("/user-edit", ctrl.put_accounts_user_edit);

router.post("/password-confirm", ctrl.post_accounts_password_confirm);

router.put("/password-edit", ctrl.put_accounts_password_edit);

router.put("/password-question-edit", ctrl.put_accounts_password_question_edit);

router.post("/question-answer-confirm", ctrl.post_accounts_question_answer_confirm);

router.post("/username-confirm", ctrl.post_accounts_username_confirm);


module.exports = router;