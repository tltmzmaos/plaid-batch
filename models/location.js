const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
  {
    address: { type: String },
    city: { type: String },
    country: { type: String },
    lat: { type: String },
    lon: { type: String },
    postal_code: { type: String },
    region: { type: String },
    store_number: { type: String },
  },
  { _id: false }
);

module.exports = locationSchema;
