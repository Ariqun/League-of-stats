const {Router} = require('express');
const axios = require('axios');
const Summoner = require('../models/summoner');
const router = Router();

router.get('/', (req, res) => {
	res.render('index', {
		title: 'League of Stats'
	});
});

router.post('/summoner', async (request, response) => {
	const region = request.body.region;
	const summoner = encodeURI(request.body.summoner);
	const profileURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}`;

	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-610f92d4-6a10-4aea-ad15-2d02be8012be"
	};

	await axios.get(profileURL, {headers: headers})
		.then(resInfo => {
			const summonerInfo = createSummonerInfo(region, resInfo.data);
			const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${res.data.id}`;

			axios.get(leagueURL, {headers: headers})
				.then(resRanked => {
					const rankedInfo = createRankedInfo(resRanked.data[0]);
					const fullInfo = {...summonerInfo, ...rankedInfo};

					Summoner.find({name: summoner, region: region}, (err, item) => {
						if (item.length) {
							Summoner.findOneAndUpdate({name: summoner, region: region}, fullInfo);
							
							response.redirect(`/summoner/${region}/${request.body.summoner}`);
						} else {
							const newSummoner = new Summoner(fullInfo);

							try {
								newSummoner.save();
							} catch(e) {
								console.log(e);
							}
		
							response.redirect(`/summoner/${region}/${request.body.summoner}`);
						}
					});
				});
		});
});

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