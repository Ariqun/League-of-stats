const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.post('/matches', async (req, res) => {
	const puuID = req.body.puuID;
	const matchList = [];
	let start = 0;

	const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuID}/ids?start=${start}&count=20`;
	matchList.push(...await getData(url));

	// do {
	// 	const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuID}/ids?start=${start}&count=100`;
	// 	matchList.push(...await getData(url));
	// 	start += 100;
	// } while (matchList.length % 100 == 0)

	res.append('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify(matchList))
})

const getData = async (url) => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-46b136a3-a703-48ad-aee4-ef78de8429db"
	};
	let result = [];

	await axios.get(url, {headers: headers})
		.then(res => result.push(...res.data))
		.catch(err => console.error(err))

	return result;
}

module.exports = router;