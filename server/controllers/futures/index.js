const { Router } = require("express");
const router = Router();
const ctrl = require("./futures.ctrl");

router.post("/", ctrl.post_futures_write);

router.get("/", ctrl.get_futures_read);

router.put("/", ctrl.put_futures_edit);

router.delete("/", ctrl.delete_futures_delete);

router.get("/:chapter_id", ctrl.get_futures_chapter_read);


module.exports = router;