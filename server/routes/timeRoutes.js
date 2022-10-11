const express = require("express");
const router = express.Router();
const { updateTime } = require("../controllers/time.controller.ts");

router.put('/', updateTime);

module.exports = router;