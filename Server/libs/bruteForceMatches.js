const getData = require('./getData');

const match = require('../models/match');

const collectTimelineInfo = require('./collectTimeLineInfo');
const pushMatchInDB = require('./pushMatchInDB');
const pushInfoInDB = require('./pushInfoInDB');
const pushInvalidMatchIdInDB = require('./pushInvalidMatchIdInDB');
const pushMatchIdInDB = require('./pushMatchIdInDB');

module.exports = async (matchId) => {
	const doc = await match.findOne({matchId});
	if (doc) return;

	try {
		const matchURL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;
		const matchInfo = await getData(matchURL);

		if (Object.keys(matchInfo).length === 0) return;
		if (matchInfo.info.gameDuration <= 300000) {
			pushMatchIdInDB(matchId);
			return;
		}

		const timelineURL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
		const timeline = await getData(timelineURL);
		const timelineInfo = collectTimelineInfo(timeline);

		const allowedQueueIds = [400, 420, 440, 700];
		const {queueId, gameCreation} = matchInfo.info;

		const nowDate = Date.parse(new Date());
		const matchDate = gameCreation;
		const startDateLastSeason = 1610118000000;
		const oneMonth = 2592000000;
		
		if (nowDate - matchDate <= oneMonth) {
			pushMatchInDB(matchInfo, timelineInfo);
		}

		if (allowedQueueIds.includes(queueId) && matchDate >= startDateLastSeason) {
			pushInfoInDB(matchInfo.info, matchId);
		}
		
		if (!allowedQueueIds.includes(queueId) || matchDate <= startDateLastSeason) {
			pushInvalidMatchIdInDB(matchId)
		}
	} catch (err) {}
};