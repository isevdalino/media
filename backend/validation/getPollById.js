const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGetPollById(data) {
let errors = {};

data.pollId = !isEmpty(data.pollId) ? data.pollId : "";

if (Validator.isEmpty(data.pollId)) {
  errors.pollId = "Id param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};