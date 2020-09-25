const mongoose = require('mongoose');

const db = mongoose.connection;

const triviaScoreSchm = new mongoose.Schema({
    id: String,
    score: Number,
    correctAns: Number,
    username: String,
    saved: {}
});

module.exports = mongoose.model('scores', triviaScoreSchm);