const express = require("express");
const createContractRoute = require("./contract");
const accountRoute = require("./account");
const router = express.Router();

router.get("/createContract", createContractRoute);
router.get("/account", accountRoute);

module.exports = router;
