const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.post('/summoner', async (req, res) => {
	console.log(req.body)
	const summoner = encodeURI(req.body.summoner);
	const region = req.body.region;

	const profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`;
	const summonerInfo = await getData(profileURL, createSummonerInfo, region);

	const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.tech.sumID}`;
	const rankedInfo = await getData(leagueURL, createRankedInfo);

	res.append('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify({...summonerInfo, ...rankedInfo}))
})

const getData = async (url, func, region = 'ru') => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-610f92d4-6a10-4aea-ad15-2d02be8012be"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => result = func(res.data, region))
		.catch(err => console.error(err))

	return result;
}

const createSummonerInfo = (res, region) => {
	const obj = {
		name: res.name,
		region: region,
		iconID: res.profileIconId,
		lvl: res.summonerLevel,
		tech: {
			sumID: res.id,
			accID: res.accountId,
			puuID: res.puuid
		}
	};

	return obj;
};

const createRankedInfo = (res) => {
	const obj = {ranked: {rank: 'Не активен'}}

	res[0].length !== 0 ? obj.ranked = {...res[0]} : null;

	return obj;
}

module.exports = router;