const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');
const collectTimeLineInfo = require('../libs/collectTimeLineInfo');
const pushMatchInDB = require('../libs/pushMatchInDB');
const pushInvalidMatchIdInDB = require('../libs/pushInvalidMatchIdInDB');
const pushInfoInDB = require('../libs/pushInfoInDB');
const match = require('../models/match');
const checkedMatchIds = require('../models/checkedMatchIds');

router.post('/match', async (req, res) => {
	const matchId = req.body.matchID;
	
	const doc = await match.findOne({matchId});
	if (doc) return res.send(doc);

	try {
		const matchInfoURL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;
		const matchInfo = await getData(matchInfoURL);
		if (Object.keys(matchInfo).length === 0) return res.send('Error');

		const timelineURL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`;
		const timeline = await getData(timelineURL);
		const timelineInfo = collectTimeLineInfo(timeline);

		const result = {...info, timeline: [timelineInfo]};

		if (matchInfo.info.gameDuration >= 300000) {
			pushMatchIdInDB(matchId);
			res.send(JSON.stringify(result));
			return;
		}

		const allowedQueueIds = [400, 420, 440];
		const {info} = matchInfo;
		const {queueId, gameCreation} = info;
		
		const nowDate = Date.parse(new Date());
		const matchDate = gameCreation;
		const startDateLastSeason = 1610053200000;
		const oneMonth = 2592000000;
		const isMatchChecked = await checkedMatchIds.findOne({matchId});

		if (nowDate - matchDate <= oneMonth) {
			pushMatchInDB(matchInfo, timelineInfo);
		}

		if (allowedQueueIds.includes(queueId) && matchDate >= startDateLastSeason && !isMatchChecked) {
			pushInfoInDB(info, matchId);
		}

		if (!allowedQueueIds.includes(queueId)) {
			pushInvalidMatchIdInDB(matchId)
		}

		res.send(JSON.stringify(result));
	} catch {}
})

module.exports = router;