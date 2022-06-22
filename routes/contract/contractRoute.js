const express = require("express");
const createContractRoute = require("../contract/createContractRoute");

const router = express.Router();

router.use("/create", createContractRoute);

module.exports = router;
