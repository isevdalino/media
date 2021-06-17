const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateEventInput(data) {
    let errors = {};
    console.log(data);

    data.name = !isEmpty(data.name) ? data.name : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "name param is required";s
    }

    if (Validator.isEmpty(data.description)) {
        errors.content = "description param is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};