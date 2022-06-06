const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const locationSchema = require('./location');

const transactionSchema = mongoose.Schema({
  account_id: { type: String },
  amount: { type: Number },
  category: [String],
  date: { type: String },
  iso_currency_code: { type: String },
  name: { type: String },
  transaction_id: { type: String },
  location: { type: locationSchema },
});

transactionSchema.plugin(uniquevalidator);
module.exports = mongoose.model('transactions', transactionSchema);
