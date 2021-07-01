const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateHasUserVoted(data) {
let errors = {};

data.pollId = !isEmpty(data.pollId) ? data.pollId : "";
data.email = !isEmpty(data.email) ? data.email : "";

if (Validator.isEmpty(data.pollId)) {
  errors.pollId = "Id param is required";
}

if (Validator.isEmpty(data.email)) {
  errors.email = "Email param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};