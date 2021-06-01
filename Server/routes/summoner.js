const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');
const collectSummonerInfo = require('../libs/collectSummonerInfo');
const collectRankedInfo = require('../libs/collectRankedInfo');
const bruteForceMatches = require('../libs/bruteForceMatches');
const deleteOldMatchesFromDB = require('../libs/deleteOldMatchesFromDB');

const checkedMatchIds = require('../models/checkedMatchIds');
const invalidcheckedMatchIds = require('../models/invalidcheckedMatchIds');

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

	do {
		const matchListURL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuId}/ids?start=${start}&count=100`;
		matchList.push(...await getData(matchListURL));
		start += 100;
	} while (matchList.length % 100 == 0)

	const checkedMatches = await checkedMatchIds.find({});
	const checkedInvalidMatches = await invalidcheckedMatchIds.find({});
	const arrOfCheckedIds = [];

	const collectCheckedMatches = (valid, invalid) => {
		const fullArr = [...valid, ...invalid];

		for (let elem of fullArr) {
			arrOfCheckedIds.push(elem.matchId);
		}
	}
	collectCheckedMatches(checkedMatches, checkedInvalidMatches);

	const uncheckedMatchIds = matchList.filter(id => !arrOfCheckedIds.includes(id));
	let count = 0;
	console.log(uncheckedMatchIds);
	let interval = setTimeout(function tick() {
		const start = count;
		const end = count + 1;
		console.log(count)
		
		const oneMatch = uncheckedMatchIds.slice(start, end);
		bruteForceMatches(oneMatch[0]);

		if (count <= uncheckedMatchIds.length) {
			interval = setTimeout(tick, 3500);
		}

		count++;
	}, 3500)

	deleteOldMatchesFromDB();

	res.send(JSON.stringify({...summonerInfo, ...rankedInfo, matchIds: matchList}));
	
})

module.exports = router;