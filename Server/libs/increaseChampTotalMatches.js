const champion = require('../models/champion');

module.exports = async (champId) => {
	await champion.updateOne({id: champId}, {
		$inc: {
			totalMatches: 1
		}
	}, {upsert: true})
}