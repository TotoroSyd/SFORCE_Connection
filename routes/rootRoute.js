const express = require("express");
const contractRoute = require("./contract/contractRoute");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello");
});
router.use("/contract", contractRoute);

module.exports = router;
