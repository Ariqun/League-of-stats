const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');
const collectRankedInfo = require('../libs/collectRankedInfo');

router.post('/ranked', async (req, res) => {
	try {
		const sumId = encodeURI(req.body.sumId);
		const region = req.body.region;
		
		const leagueURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}`;
		const rankedInfo = await getData(leagueURL, collectRankedInfo);

		res.send(JSON.stringify({...rankedInfo}));
	} catch(e) {
		res.send('Error');
	}
});

module.exports = router;