const mongoose = require('mongoose');

const StatementSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date:{
    type: Date,
    default: Date.now 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Statement', StatementSchema);