const mongoose = require('mongoose');

const db = mongoose.connection;

const playerSchm = new mongoose.Schema({
    name: String,
    id: String,
    bal: Number,
    items: [],
    stores: []
});

module.exports = mongoose.model('gamePlayers', playerSchm);