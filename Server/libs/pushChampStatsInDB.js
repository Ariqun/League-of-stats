const champion = require('../models/champion');

module.exports = (obj) => {
	const {id, name, wins, losses, bans, matches, totalMatches} = obj;

	champion.updateOne({id: id}, {
		id: id,
		name: name,
		$inc: {
			wins: wins,
			losses: losses,
			bans: bans,
			matches: matches,
			totalMatches: totalMatches
		}
	}, {upsert: true})
}