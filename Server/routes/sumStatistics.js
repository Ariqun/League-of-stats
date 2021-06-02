const {Router} = require('express');
const router = Router();

const summoner = require('../models/summoner');

router.post('/sumStatistics', async (req, res) => {
	const puuid = req.body.puuid;
	
	await summoner.findOne({puuid: puuid}, (err, doc) => {
		res.send(doc);
	})
})

module.exports = router;