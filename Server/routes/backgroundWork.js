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
	
	await match.find({$or: [{queueId: 420, checked: false}, {queueId: 400, checked: false}, {queueId: 440, checked: false}]}, (err, doc) => {
		if (doc.length !== 0) {
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
				setChecked(obj.matchId);
			}
	
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
		}
	})
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

const setChecked = async (id) => {
	await match.updateOne({matchId: id}, {$set: {checked: true}});
}

const pushStatsInDB = async (info) => {
	const {id, wins, losses, bans, matches, totalMatches} = info;

	await champion.find({id: id}, (err, doc) => {
		if (doc.length === 0) {
			const newChamp = new champion({
				id: id,
				wins: wins,
				losses: losses,
				bans: bans,
				matches: matches,
				totalMatches: totalMatches
			})
			
			newChamp.save();
		}
	})

	await champion.updateOne({id: id}, {
		$inc: {
			wins: wins,
			losses: losses,
			bans: bans,
			matches: matches,
			totalMatches: totalMatches
		}
	})
}

module.exports = router;