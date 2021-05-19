const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.post('/summoner', async (req, res) => {
	const name = encodeURI(req.body.summoner);
	const region = (req.body.region).toUpperCase();

	const profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;
	const summonerInfo = await getData(profileURL, createSummonerInfo, region);

	const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.tech.sumID}`;
	const rankedInfo = await getData(leagueURL, createRankedInfo);
	
	res.send(JSON.stringify({...summonerInfo, ...rankedInfo}));
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
		.catch(err => console.error(err))

	return result;
}

const createSummonerInfo = async (res, region) => {
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
	const obj = {ranked: {rank: 'Нет рейтинга'}}

	res[0].length !== 0 ? obj.ranked = {...res[0]} : null;

	return obj;
}

module.exports = router;