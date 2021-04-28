const {Router} = require('express');
const router = Router();

const champion = require('../models/champion');

router.post('/champion', async (req, res) => {
	const champ = req.body.champ;

	await champion.find({id: champ}, (err, doc) => {
		res.send(doc[0]);
	})
})

module.exports = router;