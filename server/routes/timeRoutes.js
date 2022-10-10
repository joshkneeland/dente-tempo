const express = require("express");
const router = express.Router();
const { updateTime } = require("../controllers/time.controller.js");

router.put('/', updateTime);

module.exports = router;