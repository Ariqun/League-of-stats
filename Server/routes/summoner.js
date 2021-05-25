const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');
const collectSummonerInfo = require('../libs/collectSummonerInfo');
const collectRankedInfo = require('../libs/collectRankedInfo');
const bruteForceMatches = require('../libs/bruteForceMatches');

router.post('/summoner', async (req, res) => {
	const name = encodeURI(req.body.summoner);
	const region = (req.body.region).toUpperCase();

	const profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;
	const summonerInfo = await getData(profileURL, collectSummonerInfo, region);

	const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.sumId}`;
	const rankedInfo = await getData(leagueURL, collectRankedInfo);

	const puuId = summonerInfo.puuId;
	const matchList = [];
	let start = 0;
	const matchListURL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuId}/ids?start=${start}&count=10`;
	matchList.push(...await getData(matchListURL));

	const result = await bruteForceMatches(matchList);
	
	if (result) {
		res.send(JSON.stringify({...summonerInfo, ...rankedInfo, matchIds: matchList}));
	}
})

module.exports = router;