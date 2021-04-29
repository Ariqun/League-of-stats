const {Router} = require('express');
const router = Router();
const axios = require('axios');

const champion = require('../models/champion');
const match = require('../models/match');

router.post('/', async (req, res) => {
	const arrOfChamps = await getChamps();
	const wins = [], losses = [], bans = [];
	let matches = 0;
	
	await match.find({$or: [{queueId: 420, checked: false}, {queueId: 400, checked: false}, {queueId: 440, checked: false}]}, (err, doc) => {
		if (doc.length !== 0) {
			for (let obj of doc) {
				let matchBans = [], matchRoles = {}, info = {};
				matches++;
	
				for (let elem of obj.participants) {
					const id = elem.championId;

					if (elem.win) {
						wins.push(id)
					} else {
						losses.push(id);
					}

					matchRoles[id] = {
						role: elem.individualPosition,
						wins: elem.win ? 1 : 0,
						matches: 1
					}

					info[id] = {
						kills: elem.kills,
						deaths: elem.deaths,
						assists: elem.assists,
						physical: elem.physicalDamageDealtToChampions,
						magic: elem.magicDamageDealtToChampions,
						trueDmg: elem.trueDamageDealtToChampions,
						restore: elem.totalHealsOnTeammates,
						shield: elem.totalDamageShieldedOnTeammates,
						cs: elem.totalMinionsKilled,
						gold: elem.goldEarned,
						doubleKills: elem.doubleKills,
						tripleKills: elem.tripleKills,
						quadraKills: elem.quadraKills,
						pentaKills: elem.pentaKills
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
				pushRolesInDB(matchRoles);
				pushInfoInDB(info);
				setChecked(obj.matchId);
			}
	
			const calculatedWins = calculateStats(wins);
			const calculatedLosses = calculateStats(losses);
			const calculatedBans = calculateStats(bans);
	
			for (let elem of arrOfChamps) {
				const id = elem[0];
				const name = elem[1];
				
				let w = checkIsNaN(calculatedWins[id]);
				let l = checkIsNaN(calculatedLosses[id]);
				let b = checkIsNaN(calculatedBans[id]);
	
				const result = {
					id: id,
					name: name,
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
		const id = res.data.data[elem].key;
		const name = res.data.data[elem].id;

		arr.push([id, name]);
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

const pushStatsInDB = async (obj) => {
	const {id, name, wins, losses, bans, matches, totalMatches} = obj;

	await champion.updateOne({id: id}, {
		id: id,
		name: name,
		$inc: {
			wins: wins,
			losses: losses,
			bans: bans,
			matches: matches,
			totalMatches: totalMatches
		}
	}, {upsert: true})
}

const pushRolesInDB = async (obj) => {
	for (let key in obj) {
		const {wins, matches} = obj[key];

		if (obj[key].role === 'TOP') {
			await champion.updateOne({id: key}, {
				$inc: {
					"roles.top.wins": wins,
					"roles.top.matches": matches
				}
			}, {upsert: true})
		} 
		
		if (obj[key].role === 'JUNGLE') {
			await champion.updateOne({id: key}, {
				$inc: {
					"roles.jungle.wins": wins,
					"roles.jungle.matches": matches
				}
			}, {upsert: true})
		}
		
		if (obj[key].role === 'MIDDLE') {
			await champion.updateOne({id: key}, {
				$inc: {
					"roles.middle.wins": wins,
					"roles.middle.matches": matches
				}
			}, {upsert: true})
		}
		
		if (obj[key].role === 'UTILITY') {
			await champion.updateOne({id: key}, {
				$inc: {
					"roles.support.wins": wins,
					"roles.support.matches": matches
				}
			}, {upsert: true})
		}
		
		if (obj[key].role === 'BOTTOM') {
			await champion.updateOne({id: key}, {
				$inc: {
					"roles.adc.wins": wins,
					"roles.adc.matches": matches
				}
			}, {upsert: true})
		}
	}
}

const pushInfoInDB = async (obj) => {
	for (let key in obj) {
		const {kills, deaths, assists, physical, magic, trueDmg, restore, shield, cs, gold, doubleKills, tripleKills, quadraKills, pentaKills} = obj[key];

		await champion.updateOne({id: key}, {
			$inc: {
				"kda.kills": kills,
				"kda.deaths": deaths,
				"kda.assists": assists,
				"dmg.physical": physical,
				"dmg.magic": magic,
				"dmg.trueDmg": trueDmg,
				"heal.restore": restore,
				"heal.shield": shield,
				"creeps": cs,
				"gold": gold,
				"kombo.doubleKills": doubleKills,
				"kombo.tripleKills": tripleKills,
				"kombo.quadraKills": quadraKills,
				"kombo.pentaKills": pentaKills
			}
		}, {upsert: true})
	}
}

module.exports = router;