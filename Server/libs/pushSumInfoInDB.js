const summoner = require('../models/summoner');
const calcRatio = require('./calcRatio');

module.exports = async (sumInfo, matchId) => {
	for (const key in sumInfo) {
		try {
			const {sumId, puuid, sumName, win, type} = sumInfo[key];
			const {champName, champId, kills, deaths, assists, physical, magic, trueDmg, restore, shield, creeps, gold, vision, wards} = sumInfo[key].champion;
			const {date, matchType, dmgTaken, CC, killingSpree, double, triple, quadra, penta} = sumInfo[key].champion;
			const role = (sumInfo[key].role)?.toLowerCase();
	
			const dmg = physical + magic + trueDmg;
			const healAndShields = restore + shield;
			const kda = calcRatio((kills + assists), deaths);
			const records = {kda, kills, deaths, assists, dmg, healAndShields, creeps, gold, vision, wards, dmgTaken, CC, killingSpree, double, triple, quadra, penta};
	
			await summoner.updateOne({puuid: puuid}, {
				puuid: puuid,
				sumId: sumId,
				sumName: sumName,
				[`champions.${champName}.name`]: champName,
				[`champions.${champName}.id`]: champId,
				$inc: {
					[`statistics.total.matches`]: 1,
					[`statistics.total.wins`]: win,
					[`statistics.total.roles.${role}.matches`]: 1,
					[`statistics.total.roles.${role}.wins`]: win,
					[`statistics.${type}.matches`]: 1,
					[`statistics.${type}.wins`]: win,
					[`statistics.${type}.roles.${role}.matches`]: 1,
					[`statistics.${type}.roles.${role}.wins`]: win,
					[`champions.${champName}.total.results.matches`]: 1,
					[`champions.${champName}.total.results.wins`]: win,
					[`champions.${champName}.total.roles.${role}.matches`]: 1,
					[`champions.${champName}.total.roles.${role}.wins`]: win,
					[`champions.${champName}.${type}.results.matches`]: 1,
					[`champions.${champName}.${type}.results.wins`]: win,
					[`champions.${champName}.${type}.roles.${role}.matches`]: 1,
					[`champions.${champName}.${type}.roles.${role}.wins`]: win,
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
					[`champions.${champName}.total.creeps`]: creeps,
					[`champions.${champName}.total.gold`]: gold,
					[`champions.${champName}.${type}.creeps`]: creeps,
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
					[`records.healAndShields.value`]: 0,
					[`records.creeps.value`]: 0,
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
				await summoner.updateOne({puuid: puuid, [`records.${key}.value`]: {$lt: value}}, {
					$set: {
						[`records.${key}.value`]: value,
						[`records.${key}.champName`]: champName,
						[`records.${key}.date`]: date,
						[`records.${key}.matchType`]: matchType,
						[`records.${key}.matchId`]: matchId
					}
				});
			}
		} catch (err) {}
	}
  };