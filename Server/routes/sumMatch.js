const {Router} = require('express');
const axios = require('axios');
const router = Router();

const match = require('../models/match');

router.post('/match', async (req, res) => {
	const matchID = req.body.matchID;
	
	await match.find({matchId: matchID}, async (err, doc) => {
		if (doc.length === 0) {
			const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}`;
			const result = await getData(url);

			if (Object.keys(result).length !== 0) {
				pushMatchInDB(result);
				res.send(JSON.stringify(result.info));
			} else {
				res.send('Error');
			}
		} else {
			res.send(doc[0]);
		}
	})
})

const getData = async (url) => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-2c731366-6570-4dfe-8302-b8fba371f23b"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => result = {...res.data})
		.catch(err => console.error(err))

	return result;
}

const pushMatchInDB = async (res) => {
	const matchObj = new match ({
		matchId: res.metadata.matchId,
		platformId: res.info.platformId,
		queueId: res.info.queueId,
		gameCreation: res.info.gameCreation,
		gameDuration: res.info.gameDuration,
		gameStartTimestamp: res.info.gameStartTimestamp,
		participants: res.info.participants,
		teams: res.info.teams
	});

	await matchObj.save();
}

module.exports = router;