const champion = require('../models/champion');

module.exports = async (champId, ban) => {
	await champion.updateOne({id: champId}, {
		$inc: {
			bans: ban,
			totalMatches: 1
		}
	}, {upsert: true})
}