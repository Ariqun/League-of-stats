const {Schema, model} = require('mongoose');

const match = new Schema({
	matchId: String,
	platformId: String,
	queueId: Number,
	gameCreation: Number,
	gameDuration: Number,
	gameStartTimestamp: Number,
	participants: Array,
	teams: Array
});

module.exports = model('Match', match);