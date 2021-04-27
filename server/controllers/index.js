const { Router } = require("express");
const router = Router();

router.use("/", require("./main"));

router.use("/admin", require("./admin"));

router.use("/api/accounts", require("./accounts"));

router.use("/api/pasts", require("./pasts"));

router.use("/api/futures", require("./futures"));

router.use("/api/timelines", require("./timelines"));

router.use("/api/images", require("./images"));

module.exports = router;
