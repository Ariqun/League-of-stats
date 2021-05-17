const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.post('/live', async (req, res) => {
	const sumId = encodeURI(req.body.sumId);
	const region = req.body.region;

	const liveURL = `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${sumId}`;
	const live = await getData(liveURL);

	res.send(JSON.stringify(live));
})

const getData = async (url) => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-a71e8f02-4103-456c-b345-58753ea3371b"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => result = res.data)
		.catch(err => console.error(err))

	return result;
}

module.exports = router;