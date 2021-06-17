const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatePutPollById(data) {
  let errors = {};
  console.log(data);

  data.answer = !isEmpty(data.answer) ? data.answer : "";

  if (Validator.isEmpty(data.answer)) {
      errors.answer = "answer param is required";s
  }

  return {
      errors,
      isValid: isEmpty(errors)
  };
};