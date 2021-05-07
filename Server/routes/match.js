const {Router} = require('express');
const axios = require('axios');
const router = Router();

const match = require('../models/match');

router.post('/match', async (req, res) => {
	const matchID = req.body.matchID;

	await match.findOne({matchId: matchID}, async (err, doc) => {
		if (!doc) {
			const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}`;
			const result = await getData(url);

			const urlTL = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}/timeline`;
			const timeline = await getData(urlTL);

			const timelienInfo = collectTimelineInfo(timeline);

			if (Object.keys(result).length !== 0) {
				pushMatchInDB(result, timelienInfo);
				res.send(JSON.stringify(result.info));
			} else {
				res.send('Error');
			}
		} else {
			res.send(doc);
		}
	})
})

const getData = async (url) => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-2cb87b3b-4170-4053-b2ac-b8acc3b89623"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => result = {...res.data})
		// .catch(err => console.error(err))

	return result;
}

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