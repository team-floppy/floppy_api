const Joi = require("joi");
module.exports = schema => (req, res, next) => {
  const result = validate(req.body, schema);
  if (result) {
    res.status(500).send(result);
  } else {
    next();
  }
  next();
};

function validate(data, schema) {
  const result = Joi.validate(data, schema);
  if (result.error == null) {
    return;
  } else {
    return result.error.details.map(error => error.message);
  }
}
