const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGetRatingByArticleId(data) {
let errors = {};

data.articleId = !isEmpty(data.articleId) ? data.articleId : "";

if (Validator.isEmpty(data.articleId)) {
  errors.id = "articleId param is required";
}

return {
  errors,
  isValid: isEmpty(errors)
};
};