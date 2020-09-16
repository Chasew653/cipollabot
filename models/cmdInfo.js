const mongoose = require('mongoose');

const db = mongoose.connection;

const cmdInfoSchem = new mongoose.Schema({
    title: String,
    description: String,
    plugin: String,
    usage: String,
    tags: {},
    image: String,
    complexity: String
});

module.exports = mongoose.model('commandInfoSaves', cmdInfoSchem)