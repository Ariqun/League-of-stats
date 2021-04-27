const {Schema, model} = require('mongoose');

const champion = new Schema({
	id: String,
	wins: Number,
	losses: Number,
	bans: Number,
	matches: Number,
	totalMatches: Number
});

module.exports = model('Champion', champion);