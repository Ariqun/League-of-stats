const {Router, json} = require('express');
const axios = require('axios');
const router = Router();

const headers = {
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
	"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
	"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
	"Origin": "https://developer.riotgames.com",
	"X-Riot-Token": "RGAPI-610f92d4-6a10-4aea-ad15-2d02be8012be"
};

router.post('/summoner', async (req, res) => {
	console.log(req.body)
	const summoner = encodeURI(req.body.summoner);
	const region = req.body.region;
	const profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`;
	let summonerInfo = {};
	let rankedInfo = {};

	await axios.get(profileURL, {headers: headers})
	.then(res => {
		summonerInfo = createSummonerInfo(region, res.data);
	})

	const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.tech.sumID}`;
	await axios.get(leagueURL, {headers: headers})
	.then(res => {
		rankedInfo = createRankedInfo(res.data[0]);
	})

	res.append('Access-Control-Allow-Origin', '*');
	await res.send(JSON.stringify({...summonerInfo, ...rankedInfo}))
})

const createSummonerInfo = (region, res) => {
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

	res.length !== 0 ? obj.ranked = {...res} : null;

	return obj;
}

module.exports = router;