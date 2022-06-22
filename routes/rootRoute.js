const express = require("express");
const contractRoute = require("./contract/contractRoute");

const router = express.Router();

router.use("/contract", contractRoute);

module.exports = router;
