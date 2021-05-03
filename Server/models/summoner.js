const {Schema, model} = require('mongoose');

const summoner = new Schema({
	sumId: String,
	sumName: String,
	totalMatches: Number,
	totalWins: Number,
	solo: Number,
	soloWins: Number,
	flex: Number,
	flexWins: Number,
	normal: Number,
	normalWins: Number,
	champions: Array
});

module.exports = model('Summoner', summoner);