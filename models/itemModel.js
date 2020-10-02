const mongoose = require('mongoose');

const db = mongoose.connection;

const itemschm = new mongoose.Schema({
    itemName: String,
    itemId: String,
    cost: Number,
    description: String,
    shopId: String
})

module.exports = mongoose.model('items', itemschm);
