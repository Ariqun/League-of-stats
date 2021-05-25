const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');
const match = require('../models/match');

router.post('/match', async (req, res) => {
	const matchID = req.body.matchID;

	await match.findOne({matchId: matchID}, async (err, doc) => {
		if (!doc) {
			const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}`;
			const result = await getData(url);

			const urlTL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}/timeline`;
			const timeline = await getData(urlTL);
			
			if (Object.keys(result).length !== 0) {
				const timelineInfo = collectTimelineInfo(timeline);

				pushMatchInDB(result, timelineInfo);

				res.send(JSON.stringify(result.info));
			} else {
				res.send('Error');
			}
		} else {
			res.send(doc);
		}
	})
})

const collectTimelineInfo = (obj) => {
	const frames = obj.info.frames;
	let participant = {};

	for (let i = 1; i <= 10; i++) {
		const lvlUp = [], itemPurchase = [];

		for (let frame of frames) {
			for (let event of frame.events) {
				if (event.participantId === i && event.type === "SKILL_LEVEL_UP") {
					lvlUp.push({skill: event.skillSlot, time: event.timestamp});
				}

				if (event.participantId === i && event.type === "ITEM_PURCHASED") {
					itemPurchase.push({item: event.itemId, time: event.timestamp});
				}

				participant[i] = {lvlUp, itemPurchase};
			}
		}
	}

	return participant;
}

const pushMatchInDB = async (res, timeline) => {
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
		checked: false
	});

	await matchObj.save();
}

module.exports = router;