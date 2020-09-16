const mongoose = require('mongoose');

const db = mongoose.connection;

const guildsSchm = new mongoose.Schema({
    name: String,
    id: String,
    prefix: String,
    donations: {}
});

module.exports = mongoose.model('guilds', guildsSchm);
