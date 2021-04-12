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
		.then(res => {
			const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${res.data.id}`;

			axios.get(leagueURL, {headers: headers})
				.then(resL => {
					Summoner.find({name: summoner, region: region}, (err, item) => {
						if (item.length) {
							Summoner.findOneAndUpdate({name: summoner, region: region}, createSumObj(region, res, resL));
							
							response.redirect(`/summoner/${region}/${request.body.summoner}`);
						} else {
							const newSum = new Summoner(createSumObj(region, res, resL));

							try {
								newSum.save();
							} catch(e) {
								console.log(e);
							}
		
							response.redirect(`/summoner/${region}/${request.body.summoner}`);
						}
					});
				});
		});
});

const createSumObj = (region, res, resL) => {
	const obj = {
		name: res.data.name,
		region: region,
		iconID: res.data.profileIconId,
		lvl: res.data.summonerLevel,
		tech: {
			sumID: res.data.id,
			accID: res.data.accountId,
			puuID: res.data.puuid
		}
	};

	if (resL.data.length == 0) {
		obj.ranked = {
			rank: 'Не активен'
		};
	} else {
		obj.ranked = {
			leagueId: resL.data[0].leagueId,
			queueType: resL.data[0].queueType,
			tier: resL.data[0].tier,
			rank: resL.data[0].rank,
			leaguePoints: resL.data[0].leaguePoints,
			wins: resL.data[0].wins,
			losses: resL.data[0].losses,
			veteran: resL.data[0].veteran,
			inactive: resL.data[0].inactive,
			freshBlood: resL.data[0].freshBlood,
			hotStreak: resL.data[0].hotStreak
		};
	}
	
	return obj;
};

module.exports = router;