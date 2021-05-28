const checkedMatchIds = require('../models/checkedMatchIds');

module.exports = async (matchId) => {
	const id = new checkedMatchIds ({
		matchId: matchId
	});

	await id.save();
}