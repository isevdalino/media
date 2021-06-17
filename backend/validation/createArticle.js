const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateArticleInput(data) {
    let errors = {};
    console.log(data);

    data.name = !isEmpty(data.name) ? data.name : "";
    data.content = !isEmpty(data.content) ? data.content : "";
    data.topic = !isEmpty(data.topic) ? data.topic : "";
    data.isPhotoArticle = !isEmpty(data.isPhotoArticle) ? data.isPhotoArticle : false;

    if (Validator.isEmpty(data.name)) {
        errors.name = "name param is required";
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = "content param is required";
    }

    if (Validator.isEmpty(data.topic)) {
        errors.topic = "topic param is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};