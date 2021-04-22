const { Router } = require("express");
const router = Router();

router.use("/", require("./main"));

router.use("/admin", require("./admin"));

router.use("/api/accounts", require("./accounts"));

router.use("/api/tokens", require("./tokens"));

router.use("/api/pasts", require("./pasts"));

router.use("/api/futures", require("./futures"));

router.use("/api/timelines", require("./timelines"));

module.exports = router;
