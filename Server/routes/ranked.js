const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.post('/ranked', async (req, res) => {
	const sumId = encodeURI(req.body.sumId);
	const region = req.body.region;
	
	const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}`;
	const rankedInfo = await getData(leagueURL, createRankedInfo);

	res.append('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify({...rankedInfo}));
})

const getData = async (url, func, region = 'ru') => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-21667d09-467b-4452-8c40-3f4ca7099d90"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => result = func(res.data, region))
		// .catch(err => console.error(err))

	return result;
}

const createRankedInfo = (res) => {
	let obj = {rank: 'Не активен'};

	res.length !== 0 ? obj = {...res[0]} : null;

	return obj;
}

module.exports = router;