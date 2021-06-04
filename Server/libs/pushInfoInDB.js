const getChamps = require('./getChamps');

const pushSumInfoInDB = require('./pushSumInfoInDB');
const pushChampInfoInDB = require('./pushChampInfoInDB');
const pushMatchIdInDB = require('./pushMatchIdInDB');
const increaseMatchesAndBans = require('./increaseMatchesAndBans');

module.exports = async (matchInfo, matchId) => {
	const {queueId, gameStartTimestamp, participants, teams} = matchInfo;
	const arrOfChamps = await getChamps();
	const types = {400: 'normal', 420: 'solo', 440: 'flex', 700: 'clash'};
	let bans = [], champInfo = {}, sumInfo = {};

	for (let elem of participants) {
		const {championId, summonerId, puuid, win, summonerName, championName, kills, deaths, assists, 
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

		sumInfo[puuid] = {
			puuid: puuid,
			sumId: summonerId,
			sumName: summonerName,
			win: win ? 1 : 0,
			type: types[queueId],
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
				creeps: totalMinionsKilled + neutralMinionsKilled,
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
			creeps: totalMinionsKilled + neutralMinionsKilled,
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
		const champId = +champ[0];
		let ban = 0;
		
		if (bans.includes(champId)) ban = 1;

		increaseMatchesAndBans(champId, ban);
	}

	pushMatchIdInDB(matchId);
	pushChampInfoInDB(champInfo, bans);
	pushSumInfoInDB(sumInfo, matchId);
}