const {Router} = require('express');
const router = Router();
const axios = require('axios');

const champion = require('../models/champion');
const match = require('../models/match');

router.post('/', async (req, res) => {
	const arrOfChamps = await getChamps();
	const wins = [];
	const losses = [];
	const bans = [];
	let matches = 0;
	
	await match.find({$or: [{queueId: 420}, {queueId: 400}, {queueId: 440}]}, (err, doc) => {
		for (let obj of doc) {
			let matchBans = [];
			matches++;

			for (let elem of obj.participants) {
				if (elem.win) {
					wins.push(elem.championId)
				} else {
					losses.push(elem.championId);
				}
			}

			for (let team of obj.teams) {
				for (let elem of team.bans) {
					if (!matchBans.includes(elem.championId)) {
						bans.push(elem.championId);
					}
				}
			}

			bans.push(...matchBans);
		}
	})

	const calculatedWins = calculateStats(wins);
	const calculatedLosses = calculateStats(losses);
	const calculatedBans = calculateStats(bans);

	for (let elem of arrOfChamps) {
		let w = checkIsNaN(calculatedWins[elem]);
		let l = checkIsNaN(calculatedLosses[elem]);
		let b = checkIsNaN(calculatedBans[elem]);

		const result = {
			id: elem,
			wins: w,
			losses: l,
			bans: b,
			matches: w + l,
			totalMatches: matches,
		}

		pushStatsInDB(result);
	}
})

const getChamps = async () => {
	const res = await axios.get('http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ru_RU/champion.json');
	const arr = [];

	for (let elem in res.data.data) {
		arr.push(res.data.data[elem].key);
	}

	return arr;
}

const calculateStats = (arr) => {
	const result = arr.reduce((acc, el) => {
		acc[el] = (acc[el] || 0) + 1;
		return acc;
	}, {});

	return result;
}

const checkIsNaN = (num) => {
	if (isNaN(num)) return 0;

	return num;
}

const pushStatsInDB = async (info) => {
	console.log(info.id)
	await champion.updateOne({id: info.id}, {
		id: info.id,
		wins: info.wins,
		losses: info.losses,
		bans: info.bans,
		matches: info.matches,
		totalMatches: info.totalMatches
	})
}

module.exports = router;