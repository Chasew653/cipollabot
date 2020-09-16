const mongoose = require('mongoose');

const db = mongoose.connection;

const guildsSavesSchm = new mongoose.Schema({
    id: String,
    reports: {},
    messages: {},
    saves: {},
    tags: {}
});

module.exports = mongoose.model('guildSaves', guildsSavesSchm);
