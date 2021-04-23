const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.post('/match', async (req, res) => {
	const matchID = req.body.matchID;
	
	const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}`;
	const match = await getData(url);

	res.append('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify(match))
})

const getData = async (url) => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-638e5eca-eefe-46de-90ca-0931eb4f1241"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => result = {...res.data.info})
		.catch(err => console.error(err))

	return result;
}

module.exports = router;