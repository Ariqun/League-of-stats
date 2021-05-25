const match = require('../models/match');

module.exports = async (res, timeline) => {
	const matchObj = new match ({
		matchId: res.metadata.matchId,
		platformId: res.info.platformId,
		queueId: res.info.queueId,
		gameCreation: res.info.gameCreation,
		gameDuration: res.info.gameDuration,
		gameStartTimestamp: res.info.gameStartTimestamp,
		participants: res.info.participants,
		teams: res.info.teams,
		timeline: timeline,
		checked: true
	});

	await matchObj.save();
}