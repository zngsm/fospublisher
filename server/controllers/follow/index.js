const { Router } = require("express");
const router = Router();
const ctrl = require("./follow.ctrl");
const { verifyToken } = require("../tokens/authorization");

router.post("/", verifyToken, ctrl.add_follow);

router.delete("/:id", verifyToken, ctrl.remove_follow);

router.get("/list", verifyToken, ctrl.get_follow_list);

router.get("/list/following", verifyToken, ctrl.get_following_list);

router.get("/list/follower", verifyToken, ctrl.get_follower_list);

router.get("/book/:id", verifyToken, ctrl.get_follow_book);

module.exports = router;
