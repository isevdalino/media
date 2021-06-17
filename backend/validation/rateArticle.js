const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRateArticleInput(reqData,bodyData) {
    let errors = {};

    reqData.articleId = !isEmpty(reqData.articleId) ? reqData.articleId : "";
    bodyData.rating = !isEmpty(bodyData.rating) ? bodyData.rating : -1;

    if (Validator.isEmpty(reqData.articleId)) {
        errors.articleId = "articleId param is required";s
    }

    if (bodyData.rating == -1) {
        errors.rating = "rating param is required";
    }

    if (bodyData.rating < 1 ||bodyData.rating>10 ) {
        errors.rating = "rating must be a possitive number between 1 and 10";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};