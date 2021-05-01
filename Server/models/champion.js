const {Schema, model} = require('mongoose');

const champion = new Schema({
	id: String,
	name: String,
	wins: Number,
	losses: Number,
	bans: Number,
	matches: Number,
	totalMatches: Number,
	creeps: Number,
	gold: Number,
	roles: {
		top: Array,
		jungle: Array,
		middle: Array,
		support: Array,
		adc: Array
	},
	kda: {
		kills: Number,
		deaths: Number,
		assists: Number,
	},
	dmg: {
		physical: Number,
		magic: Number,
		trueDmg: Number,
	},
	heal: {
		restore: Number,
		shield: Number
	},
	combo: {
		double: Number,
		triple: Number,
		quadro: Number,
		penta: Number
	}
});

module.exports = model('Champion', champion);