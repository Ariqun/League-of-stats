const match = require('../models/match');

module.exports = async (matchInfo, timeline) => {
	const {platformId, queueId, gameCreation, gameDuration, gameStartTimestamp, participants, teams} = matchInfo.info;
	const {matchId} = matchInfo.metadata;

	const matchObj = new match ({
		matchId,
		platformId,
		queueId,
		gameCreation,
		gameDuration,
		gameStartTimestamp,
		participants,
		teams,
		timeline,
		checked: true
	});

	await matchObj.save();
}