const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isPhotoArticle: {
    type: Boolean,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

ArticleSchema.index({name: 'text', authorName: 'text',content: 'text',topic: 'text'});

Article = mongoose.model("articles", ArticleSchema);
module.exports = Article
