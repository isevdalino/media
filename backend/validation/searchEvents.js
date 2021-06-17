const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSearchArticles(data) {
let errors = {};

data.keywords = !isEmpty(data.keywords) ? data.keywords : "";

if (Validator.isEmpty(data.keywords)) {
  errors.keywords = "keywords param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};