const {Router} = require('express');
const router = Router();

const summoner = require('../models/summoner');

router.post('/sumStatistics', async (req, res) => {
	const sumID = req.body.sumID;

	await summoner.findOne({sumId: sumID}, (err, doc) => {
		res.send(doc);
	})
})

module.exports = router;