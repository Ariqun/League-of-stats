const {Router} = require('express');
const router = Router();

const champion = require('../models/champion');

router.post('/champion', async (req, res) => {
	const champ = req.body.champ;

	await champion.findOne({id: champ}, (err, doc) => {
		res.send(doc);
	})
})

router.post('/champions', async (req, res) => {
	await champion.find({}, (err, doc) => {
		res.send(doc);
	})
})

module.exports = router;