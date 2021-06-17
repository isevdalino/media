const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCommentArticleInput(reqData,bodyData) {
    let errors = {};

    reqData.articleId = !isEmpty(reqData.articleId) ? reqData.articleId : "";
    bodyData.comment = !isEmpty(bodyData.comment) ? bodyData.comment : "";

    if (Validator.isEmpty(reqData.articleId)) {
        errors.articleId = "articleId param is required";
    }

    if (Validator.isEmpty(bodyData.comment)) {
        errors.articleId = "comment param is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};