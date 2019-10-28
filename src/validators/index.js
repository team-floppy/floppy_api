const Joi = require("joi");

module.exports = (data, schema) => {
  const result = Joi.validate(data, schema);
  if (result.error == null) {
    return;
  } else {
    return result.error.details.map(error => error.message);
  }
};
