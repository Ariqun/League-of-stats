const {Router} = require('express');
const router = Router();
const axios = require('axios');

const match = require('../models/match');
const champion = require('../models/champion');
const summoner = require('../models/summoner');

router.post('/', async (req, res) => {
	const arrOfChamps = await getChamps();
	const wins = [], losses = [], bans = [];
	let matches = 0;

	await match.find({$or: [{queueId: 400, checked: false}, {queueId: 420, checked: false}, {queueId: 440, checked: false}]}, (err, doc) => {
		if (doc.length !== 0) {
			for (let obj of doc) {
				const matchType = obj.queueId, date = obj.gameStartTimestamp;
				let matchBans = [], matchRoles = {}, info = {}, sumInfo = {};
				matches++;
	
				for (let elem of obj.participants) {
					const id = elem.championId;
					const sumId = elem.summonerId;

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

					sumInfo[sumId] = {
						sumId: sumId,
						sumName: elem.summonerName,
						matches: 1,
						win: elem.win ? 1 : 0,
						solo: matchType === 420 ? 1 : 0,
						flex: matchType === 440 ? 1 : 0,
						normal: matchType === 400 ? 1 : 0,
						champion: {
							champId: id,
							champName: elem.championName,
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
							vision: elem.visionScore,
							wards: elem.wardsPlaced,
							date: date,
							matchType: matchType,
							dmgTaken: elem.totalDamageTaken,
							CC: elem.totalTimeCCDealt,
							killingSpree: elem.killingSprees,
							double: elem.doubleKills,
							triple: elem.tripleKills,
							quadra: elem.quadraKills,
							penta: elem.pentaKills
						}
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
						double: elem.doubleKills,
						triple: elem.tripleKills,
						quadra: elem.quadraKills,
						penta: elem.pentaKills
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
				pushChampRolesInDB(matchRoles);
				pushChampInfoInDB(info);
				pushSumInfoInDB(sumInfo);
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
	
				pushChampStatsInDB(result);
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

const pushChampStatsInDB = async (obj) => {
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

const pushChampRolesInDB = async (obj) => {
	for (let key in obj) {
		const {wins, matches} = obj[key];
		const role = (obj[key].role).toLowerCase();

		await champion.updateOne({id: key}, {
			$inc: {
				[`roles.${role}.wins`]: wins,
				[`roles.${role}.matches`]: matches
			}
		}, {upsert: true})
	}
}

const pushChampInfoInDB = async (obj) => {
	for (let key in obj) {
		const {kills, deaths, assists, physical, magic, trueDmg, restore, shield, cs, gold, double, triple, quadra, penta} = obj[key];

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
				"combo.double": double,
				"combo.triple": triple,
				"combo.quadro": quadra,
				"combo.penta": penta
			}
		}, {upsert: true})
	}
}

const pushSumInfoInDB = async (obj) => {
	for (let key in obj) {
		const {sumId, sumName, matches, win, solo, flex, normal} = obj[key];
		const {champName, champId, kills, deaths, assists, physical, magic, trueDmg, restore, shield, cs, gold, vision, wards} = obj[key].champion;
		const {date, matchType, dmgTaken, CC, killingSpree, double, triple, quadra, penta} = obj[key].champion;

		const dmg = physical + magic + trueDmg;
		const heal = restore + shield;
		const kda = +((kills + assists) / deaths).toFixed(1);
		const records = {kda, kills, deaths, assists, dmg, heal, cs, gold, vision, wards, dmgTaken, CC, killingSpree, double, triple, quadra, penta};

		let type = '';
		if (solo) type = 'solo';
		if (flex) type = 'flex';
		if (normal) type = 'normal';

		await summoner.updateOne({sumId: sumId}, {
			sumId: sumId,
			sumName: sumName,
			[`champions.${champName}.name`]: champName,
			[`champions.${champName}.champId`]: champId,
			$inc: {
				totalMatches: matches,
				totalWins: win,
				solo: solo,
				soloWins: win,
				flex: flex,
				flexWins: win,
				normal: normal,
				normalWins: win,
				[`champions.${champName}.total.results.matches`]: matches,
				[`champions.${champName}.total.results.wins`]: win,
				[`champions.${champName}.${type}.results.matches`]: matches,
				[`champions.${champName}.${type}.results.wins`]: win,
				[`champions.${champName}.total.kda.kills`]: kills,
				[`champions.${champName}.total.kda.deaths`]: deaths,
				[`champions.${champName}.total.kda.assists`]: assists,
				[`champions.${champName}.${type}.kda.kills`]: kills,
				[`champions.${champName}.${type}.kda.deaths`]: deaths,
				[`champions.${champName}.${type}.kda.assists`]: assists,
				[`champions.${champName}.total.dmg.physical`]: physical,
				[`champions.${champName}.total.dmg.magic`]: magic,
				[`champions.${champName}.total.dmg.trueDmg`]: trueDmg,
				[`champions.${champName}.${type}.dmg.physical`]: physical,
				[`champions.${champName}.${type}.dmg.magic`]: magic,
				[`champions.${champName}.${type}.dmg.trueDmg`]: trueDmg,
				[`champions.${champName}.total.heal.restore`]: restore,
				[`champions.${champName}.total.heal.shield`]: shield,
				[`champions.${champName}.${type}.heal.restore`]: restore,
				[`champions.${champName}.${type}.heal.shield`]: shield,
				[`champions.${champName}.total.cs`]: cs,
				[`champions.${champName}.total.gold`]: gold,
				[`champions.${champName}.${type}.cs`]: cs,
				[`champions.${champName}.${type}.gold`]: gold,
				[`champions.${champName}.total.vision`]: vision,
				[`champions.${champName}.total.wards`]: wards,
				[`champions.${champName}.${type}.vision`]: vision,
				[`champions.${champName}.${type}.wards`]: wards,
				[`records.kda.value`]: 0,
				[`records.kills.value`]: 0,
				[`records.deaths.value`]: 0,
				[`records.assists.value`]: 0,
				[`records.dmg.value`]: 0,
				[`records.heal.value`]: 0,
				[`records.cs.value`]: 0,
				[`records.gold.value`]: 0,
				[`records.vision.value`]: 0,
				[`records.wards.value`]: 0,
				[`records.dmgTaken.value`]: 0,
				[`records.CC.value`]: 0,
				[`records.killingSpree.value`]: 0,
				[`records.double.value`]: 0,
				[`records.triple.value`]: 0,
				[`records.quadra.value`]: 0,
				[`records.penta.value`]: 0
			}
		}, {upsert: true});

		for (let key in records) {
			const value = records[key];

			await summoner.updateOne({sumId: sumId, [`records.${key}.value`]: {$lt: value}}, {
				$set: {
					[`records.${key}.value`]: value,
					[`records.${key}.champName`]: champName,
					[`records.${key}.date`]: date,
					[`records.${key}.matchType`]: matchType
				}
			});
		}
	}
}

module.exports = router;