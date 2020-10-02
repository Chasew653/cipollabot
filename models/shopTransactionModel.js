const mongoose = require('mongoose');

const db = mongoose.connection;

const tranSchm = new mongoose.Schema({
    toId: String,
    paid: String,        
    bought: String
});

module.exports = mongoose.model('transactionLogs', tranSchm);