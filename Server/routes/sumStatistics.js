const {Router} = require('express');
const router = Router();

const summoner = require('../models/summoner');

router.post('/sumStatistics', async (req, res) => {
	const sumID = req.body.sumID;

	await summoner.find({sumId: sumID}, (err, doc) => {
		res.send(doc[0]);
	})
})

module.exports = router;