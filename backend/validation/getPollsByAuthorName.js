const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGetPollsByAuthorName(data) {
let errors = {};

data.authorName = !isEmpty(data.authorName) ? data.authorName : "";

if (Validator.isEmpty(data.authorName)) {
  errors.id = "authorName param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};