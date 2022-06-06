const request = require('request');
const mongoose = require('mongoose');

const Transaction = require('../models/transaction');

let client_id = process.env.PLAID_CLIENT_ID;
let secret_key = process.env.PLAID_SECRET_KEY;
let access_token = process.env.PLAID_ACCESS_TOKEN;
let mongo_db = process.env.MONGO_DB_CONNECT;

console.log('Attempt to connect MongoDB');
mongoose
  .connect(mongo_db)
  .then(() => {
    console.log('Connected to database successfully');
  })
  .catch(() => {
    console.log('Connection failed');
  });

var date_ob = new Date();
var day = ('0' + date_ob.getDate()).slice(-2);
var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
var year = date_ob.getFullYear();
var date = year + '-' + month + '-' + day;

var options = {
  method: 'POST',
  url: 'https://development.plaid.com/transactions/get',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: client_id,
    secret: secret_key,
    access_token: access_token,
    start_date: date,
    end_date: date,
  }),
};

request(options, (error, response) => {
  if (error) throw new Error(error);
  const json = JSON.parse(response.body);
  const transactions = json['transactions'];
  console.log(date, date, json['total_transactions']);
  console.log('Database connection status - ' + mongoose.connection.readyState);
  if (json['total_transactions'] === 0) process.exit(0);
  let trans = [];
  for (let i = 0; i < transactions.length; i++) {
    trans.push(transactions[i]);
  }
  Transaction.insertMany(trans, function (err, mongooseDocuments) {
    if (err) {
      console.log('Failed to save');
      process.exit(1);
    } else {
      console.log('Saved successfully');
      process.exit(0);
    }
  });
});
