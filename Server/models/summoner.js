const {Schema, model} = require('mongoose');

const summoner = new Schema({
	sumId: String,
	sumName: String,
	statistics: Array,
	champions: Array,
	records: Array
});

module.exports = model('Summoner', summoner);