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

		const allowedTypeIds = [400, 420, 440];
		const typeId = matchInfo.info.queueId;
		
		const nowDate = Date.parse(new Date());
		const matchDate = matchInfo.info.gameCreation;
		const startDateLastSeason = 1610053200000;
		const oneMonth = 2592000000;
		const isMatchChecked = await checkedMatchIds.findOne({matchId});

		if (nowDate - matchDate <= oneMonth) {
			pushMatchInDB(matchInfo, timelineInfo);
		}

		if (allowedTypeIds.includes(typeId) && matchDate >= startDateLastSeason && !isMatchChecked) {
			pushInfoInDB(matchInfo.info, matchId);
		}

		if (!allowedTypeIds.includes(typeId)) {
			pushInvalidMatchIdInDB(matchId)
		}

		const result = {...matchInfo.info, timeline: [timelineInfo]};
		
		res.send(JSON.stringify(result));
	} catch {}
})

module.exports = router;