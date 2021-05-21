const { Router } = require("express");
const router = Router();

// router.use("/api", require("./main"));

router.use("/api/accounts", require("./accounts"));

router.use("/api/pasts", require("./pasts"));

router.use("/api/futures", require("./futures"));

router.use("/api/timelines", require("./timelines"));

router.use("/api/questions", require("./questions"));

router.use("/api/images", require("./images"));

router.use("/api/follow", require("./follow"));

router.use("/api/search", require("./search"));

module.exports = router;
