const {Router} = require('express');
const router = Router();

const summoner = require('../models/summoner');

router.post('/sumStatistics', async (req, res) => {
	try {
		const {sumId} = req.body;
	
		await summoner.findOne({sumId: sumId}, (err, doc) => {
			res.send(doc);
		})
	} catch(e) {
		res.send('Error');
	}
})

module.exports = router;