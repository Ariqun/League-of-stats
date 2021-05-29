const match = require('../models/match');

const now = Date.parse(new Date);
const oneMonth = 2592000000;
const value = now - oneMonth;

module.exports = async () => {
	await match.remove({gameCreation: {$lt: value}});
}