const {Router} = require('express');
const Summoner = require('../models/summoner');
const router = Router();

router.get('/summoner', (req, res) => {
	// console.log(req)
	// console.log(res)
});

router.get('/:region/:name', (req, res) => {
	Summoner.find({name: req.params.name, region: req.params.region}, (err, item) => {
		res.render('summoner', {
			title: `LoS - ${item[0].name}`,
			region: item[0].region,
			name: item[0].name,
			icon: item[0].iconID,
			lvl: item[0].lvl,
			ranked: item[0].ranked
		});
	});

	
});

module.exports = router;