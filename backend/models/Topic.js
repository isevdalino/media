const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

Topic = mongoose.model("topics", TopicSchema);
module.exports = Topic
