const {Router} = require('express');
const router = Router();

const getData = require('../libs/getData');

router.post('/live', async (req, res) => {
	const sumId = encodeURI(req.body.sumId);
	const region = req.body.region;

	const liveURL = `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${sumId}`;
	const live = await getData(liveURL);

	res.send(JSON.stringify(live));
})

module.exports = router;