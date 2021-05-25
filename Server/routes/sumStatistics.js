const {Router} = require('express');
const router = Router();

const summoner = require('../models/summoner');

router.post('/sumStatistics', async (req, res) => {
	const sumId = req.body.sumId;
	
	await summoner.findOne({sumId: sumId}, (err, doc) => {
		res.send(doc);
	})
})

module.exports = router;