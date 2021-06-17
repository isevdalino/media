const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateDonationInput(data) {
    let errors = {};
    console.log(data);

    data.amount = !isEmpty(data.amount) ? data.amount : -1;

    if (data.amount== -1) {
        errors.amount = "amount param is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};