const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  articleId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

Rating = mongoose.model("ratings", ArticleSchema);
module.exports = Rating
