const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  type:   { type: String, required: true },
  amount: { type: Number, required: true },
  names:  { type: [String], required: true },
  days:   { type: [Number], default: [] },
  split:  { type: String, required: true },
  date:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', BillSchema);