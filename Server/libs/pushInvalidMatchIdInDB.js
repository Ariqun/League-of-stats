const invalidcheckedMatchIds = require('../models/invalidcheckedMatchIds');

module.exports = async (matchId) => {
	const id = new invalidcheckedMatchIds ({
		matchId: matchId
	});

	await id.save();
}