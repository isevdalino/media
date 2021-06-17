const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateArticleInput(data) {
    let errors = {};
    console.log(data);

    data.name = !isEmpty(data.name) ? data.name : "";
    data.answers = !isEmpty(data.answers) ? data.answers : [];

    if (Validator.isEmpty(data.name)) {
        errors.name = "name param is required";s
    }

    if (data.answers === undefined || data.answers.length < 2) {
        errors.answers = "answers param is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};