const express = require("express");
const router = express.Router();
const { updateTime, updateTimeValue } = require("../controllers/time.controller.ts");

router.put('/', updateTimeValue);

module.exports = router;