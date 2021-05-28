const getChamps = require('./getChamps');

const pushSumInfoInDB = require('./pushSumInfoInDB');
const pushChampInfoInDB = require('./pushChampInfoInDB');
const pushMatchIdInDB = require('./pushMatchIdInDB');
const increaseChampTotalMatches = require('./increaseChampTotalMatches');

module.exports = async (matchInfo, matchId) => {
	const {queueId, gameStartTimestamp, participants, teams} = matchInfo;
	const arrOfChamps = await getChamps();
	let bans = [], champInfo = {}, sumInfo = {};

	for (let elem of participants) {
		const {championId, summonerId, win, summonerName, championName, kills, deaths, assists, 
				totalMinionsKilled, neutralMinionsKilled, goldEarned, visionScore, wardsPlaced,
				physicalDamageDealtToChampions, magicDamageDealtToChampions, trueDamageDealtToChampions,
				totalHealsOnTeammates, totalDamageShieldedOnTeammates, totalDamageTaken, timeCCingOthers,
				killingSprees, doubleKills, tripleKills, quadraKills, pentaKills, individualPosition,
				item0, item1, item2, item3, item4, item5, item6, perks} = elem;
		const items = [item0, item1, item2, item3, item4, item5, item6];
		const doubleStyles = `${perks.styles[0].style}_${perks.styles[1].style}`;
		const runes = [];

		for (let elem of perks.styles) {
			for (let perks of elem.selections) {
				runes.push(perks.perk);
			}
		}

		sumInfo[summonerId] = {
			sumId: summonerId,
			sumName: summonerName,
			win: win ? 1 : 0,
			solo: queueId === 420 ? 1 : 0,
			flex: queueId === 440 ? 1 : 0,
			normal: queueId === 400 ? 1 : 0,
			role: individualPosition,
			champion: {
				champId: championId,
				champName: championName,
				kills: kills,
				deaths: deaths,
				assists: assists,
				physical: physicalDamageDealtToChampions,
				magic: magicDamageDealtToChampions,
				trueDmg: trueDamageDealtToChampions,
				restore: totalHealsOnTeammates,
				shield: totalDamageShieldedOnTeammates,
				cs: totalMinionsKilled + neutralMinionsKilled,
				gold: goldEarned,
				vision: visionScore,
				wards: wardsPlaced,
				date: gameStartTimestamp,
				matchType: queueId,
				dmgTaken: totalDamageTaken,
				CC: timeCCingOthers,
				killingSpree: killingSprees,
				double: doubleKills,
				triple: tripleKills,
				quadra: quadraKills,
				penta: pentaKills
			}
		}

		champInfo[championId] = {
			id: championId,
			name: championName,
			kills: kills,
			deaths: deaths,
			assists: assists,
			physical: physicalDamageDealtToChampions,
			magic: magicDamageDealtToChampions,
			trueDmg: trueDamageDealtToChampions,
			restore: totalHealsOnTeammates,
			shield: totalDamageShieldedOnTeammates,
			cs: totalMinionsKilled + neutralMinionsKilled,
			gold: goldEarned,
			double: doubleKills,
			triple: tripleKills,
			quadra: quadraKills,
			penta: pentaKills,
			role: individualPosition,
			win: win ? 1 : 0,
			items: items,
			doubleStyles: doubleStyles,
			runes: runes
		}
	}

	for (let team of teams) {
		for (let elem of team.bans) {
			bans.push(elem.championId);
		}
	}

	for (let champ of arrOfChamps) {
		const champId = champ[0];
		increaseChampTotalMatches(champId);
	}

	pushMatchIdInDB(matchId);
	pushChampInfoInDB(champInfo, bans);
	pushSumInfoInDB(sumInfo, matchId);
}