const {Schema, model} = require('mongoose');

const invalidcheckedMatchIds = new Schema({
	matchId: String
});

module.exports = model('InvalidCheckedMatchIds', invalidcheckedMatchIds);