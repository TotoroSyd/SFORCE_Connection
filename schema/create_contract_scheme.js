const { body } = require("express-validator");

const create_contract_schema = [
  body("firstName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name must be letters"),
  body("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last name must be letters"),
  body("phone").isInt(),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must contain a valid email"),
  body("unit").isInt().withMessage("Unit must contain numbers only"),
  body("country").matches(/^[A-Za-z\s]+$/),
  body("city").matches(/^[A-Za-z\s]+$/),
  body("state")
    .isAlpha()
    .isIn(["NSW", "ACT", "VIC", "NT", "QLD", "SA", "TAS", "WA"])
    .withMessage("Must provide valid state code"),
  body("postCode").isInt().withMessage("Postcode must contain numbers only"),
];
module.exports = create_contract_schema;
