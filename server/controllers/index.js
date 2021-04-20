const { Router } = require("express");
const router = Router();

router.use("/", require("./main"));

router.use("/admin", require("./admin"));

module.exports = router;
