const summoner = require('../models/summoner');

module.exports = async (masteryInfo, puuid) => {
	for (const key in masteryInfo) {
		try {
			const {championId, championName, championLevel, championPoints} = masteryInfo[key];
	
			await summoner.updateOne({puuid: puuid, [`champions.${championName}.name`]: championName}, {
				$set: {
					[`champions.${championName}.name`]: championName,
					[`champions.${championName}.id`]: championId,
					[`champions.${championName}.level`]: championLevel,
					[`champions.${championName}.score`]: championPoints,
				}
			}, {upsert: true});
		} catch (err) {}
	}
  };