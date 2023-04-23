const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type:String
  }
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
