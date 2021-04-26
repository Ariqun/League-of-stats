const {Schema, model} = require('mongoose');

const summoner = new Schema({
	name: String,
	region: String,
	iconID: Number,
	lvl: Number,
	tech: {
		sumID: String,
		accID: String,
		puuID: String
	},
	ranked: {
		leagueId: String,
		queueType: String,
		tier: String,
		rank: String,
		leaguePoints: Number,
		wins: Number,
		losses: Number,
		veteran: Number,
		inactive: Number,
		freshBlood: Number,
		hotStreak: Number
	}
});

module.exports = model('Summoner', summoner);