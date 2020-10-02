const mongoose = require('mongoose');

const db = mongoose.connection;

const shopSchm = new mongoose.Schema({
    ownerId: String,
    ownerName: String,
    description: String,
    transactions: [],
    items: []
});

module.exports = mongoose.model('gameShops', shopSchm);