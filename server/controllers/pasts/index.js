const { Router } = require("express");
const router = Router();
const ctrl = require("./pasts.ctrl");

router.post("/", ctrl.post_pasts_write);

router.get("/", ctrl.get_pasts_read);

router.put("/", ctrl.put_pasts_edit);

router.delete("/", ctrl.delete_pasts_delete);

router.get("/:chapter_id", ctrl.get_pasts_chapter_read);


module.exports = router;