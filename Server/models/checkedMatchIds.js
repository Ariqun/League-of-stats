const {Schema, model} = require('mongoose');

const checkedMatchIds = new Schema({
	matchId: String
});

module.exports = model('CheckedMatchIds', checkedMatchIds);