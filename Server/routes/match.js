const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');
const collectTimeLineInfo = require('../libs/collectTimeLineInfo');
const pushMatchInDB = require('../libs/pushMatchInDB');
const pushInvalidMatchIdInDB = require('../libs/pushInvalidMatchIdInDB');
const pushInfoInDB = require('../libs/pushInfoInDB');
const match = require('../models/match');
const checkedMatchIds = require('../models/checkedMatchIds');
const checkArea = require('../libs/checkArea');

router.post('/match', async (req, res) => {
	const {matchId, region} = req.body;
	const area = checkArea(region);

	const doc = await match.findOne({matchId});
	if (doc) return res.send(doc);
	
	try {
		const matchInfoURL = `https://${area}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
		const matchInfo = await getData(matchInfoURL);

		if (Object.keys(matchInfo).length === 0) return res.send('Error');
		
		const timelineURL = `https://${area}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
		const timeline = await getData(timelineURL);
		const timelineInfo = collectTimeLineInfo(timeline);
		
		const result = {...matchInfo.info, timeline: [timelineInfo]};
		
		if (matchInfo.info.gameDuration <= 300000) {
			res.send(JSON.stringify(result));
			pushMatchIdInDB(matchId);
		}
		
		const allowedQueueIds = [400, 420, 440, 700];
		const {queueId, gameCreation} = matchInfo.info;
		
		const nowDate = Date.parse(new Date());
		const matchDate = gameCreation;
		const startDateLastSeason = 1610053200000;
		const oneMonth = 2592000000;
		const isMatchChecked = await checkedMatchIds.findOne({matchId});
		
		if (nowDate - matchDate <= oneMonth) {
			pushMatchInDB(matchInfo, timelineInfo);
		}

		if (allowedQueueIds.includes(queueId) && matchDate >= startDateLastSeason && !isMatchChecked) {
			pushInfoInDB(matchInfo.info, matchId);
		}

		if (!allowedQueueIds.includes(queueId)) {
			pushInvalidMatchIdInDB(matchId)
		}
		
		res.send(JSON.stringify(result));
	} catch(e) {
		res.send('Error');
	}
})

module.exports = router;