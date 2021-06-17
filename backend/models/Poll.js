const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Answer = new Schema({
  name: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true
  }
});

const PollSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  answers: {
    type: [Answer],
    required: true
  },
  voters: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

PollSchema.index({name: 'text', authorName: 'text'});

Poll = mongoose.model("polls", PollSchema);
module.exports = Poll
