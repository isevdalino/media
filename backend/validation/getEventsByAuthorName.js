const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGetEventsByAuthorNameInput(data) {
let errors = {};

data.authorName = !isEmpty(data.authorName) ? data.authorName : "";

if (Validator.isEmpty(data.authorName)) {
  errors.authorName = "authorName param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};