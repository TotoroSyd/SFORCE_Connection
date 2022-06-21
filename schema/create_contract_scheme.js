const { body } = require("express-validator");

const create_contract_schema = [
  body("firstName").isAlpha().withMessage("First name must be letters"),
  body("lastName").isAlpha().withMessage("Last name must be letters"),
  body("phone").isInt(),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must contain a valid email"),
  body("unit").isInt().withMessage("Unit must contain numbers only"),
  body("country").isAlpha(),
  body("city").isAlpha(),
  body("state")
    .isAlpha()
    .isIn(["NSW", "ACT", "VIC", "NT", "QLD", "SA", "TAS", "WA"])
    .withMessage("Must provide valid state code"),
  body("postCode").isInt().withMessage("Postcode must contain numbers only"),
];
module.exports = create_contract_schema;
