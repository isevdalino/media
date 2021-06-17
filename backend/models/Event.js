const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

EventSchema.index({name: 'text', authorName: 'text',description: 'text'});

Event = mongoose.model("events", EventSchema);
module.exports = Event
