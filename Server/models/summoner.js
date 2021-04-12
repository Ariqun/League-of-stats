const {Schema, model} = require('mongoose');

const summoner = new Schema({
	name: String,
	region: String,
	iconID: String,
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
        veteran: Boolean,
        inactive: Boolean,
        freshBlood: Boolean,
        hotStreak: Boolean
	}
});

module.exports = model('Summoner', summoner);