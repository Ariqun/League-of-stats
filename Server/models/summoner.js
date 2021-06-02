const {Schema, model} = require('mongoose');

const summoner = new Schema({
	puuid: String,
	sumId: String,
	sumName: String,
	statistics: Array,
	champions: Array,
	records: Array,
	checkedMatches: Array
});

module.exports = model('Summoner', summoner);