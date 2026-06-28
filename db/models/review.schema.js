const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id:
    {
    type: Number,
    required: true,
    autoIncrement: true
  },
  name: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});
const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;