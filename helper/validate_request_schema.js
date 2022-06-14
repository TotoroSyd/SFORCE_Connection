const { validationResult } = require("express-validator");

const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req);
  // finds the validation errors in this reuest and wraps them in an object with handy functons
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateRequestSchema;
