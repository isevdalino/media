const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGetArticlesByTopic(data) {
let errors = {};

data.topic = !isEmpty(data.topic) ? data.topic : "";

if (Validator.isEmpty(data.topic)) {
  errors.topic = "topic param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};