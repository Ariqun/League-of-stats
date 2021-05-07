import matchStartDate from './matchStartDate';
import matchDuration from './matchDuration';
import matchResult from './matchResult';
import totalTeamKills from './totalTeamKills';
import itemsTable from './itemsTable';
import playersTable from './playersTable';
import scorePerMin from './scorePerMin';
import playerRunes from './playerRunes';
import {getMatchType, getAllPlayerSpells, getMainPlayerRunes} from './infoFromDData';

import RiotAPI from '../../../../services/riotAPI';

const getMatchInfo = (matchId, version, name, mini) => {
	const riotAPI = new RiotAPI();
	let matchInfo = {}, playerInfo = {}, error = false;

	const getMatchInfo = async () => {
		const res = await riotAPI.getMatchInfo(matchId);

		if (res === 'Error') error = true;
		matchInfo = {...res};
	}
	
	const result = async () => {
		await getMatchInfo();
		if (error) return null;

		const {platformId, queueId, participants, teams, gameStartTimestamp, gameDuration} = matchInfo;
		const matchType = await getMatchType(queueId);
		const duration = matchDuration(gameDuration);
		const startDate = matchStartDate(gameStartTimestamp);

		if (mini) {
			for (let elem of participants) {
				if (elem.summonerName === name) {
					playerInfo = {...elem};
				}
			}
			
			const {summonerName, championName, kills, deaths, assists, totalMinionsKilled, teamId, perks} = playerInfo;

			const mainRunes = await getMainPlayerRunes(perks, version);
			const spells = await getAllPlayerSpells(playerInfo, version);
			const matchRes = matchResult(teams, teamId);
			const teamKills = totalTeamKills(teams, teamId);
			const farmPerMin = scorePerMin(totalMinionsKilled, gameDuration);
			const items = itemsTable(playerInfo, version);
			const players = playersTable(summonerName, participants, version);

			let res = {
				spells, mainRunes, matchType, kills, deaths, assists, platformId, startDate, duration, matchRes, teamKills, totalMinionsKilled, farmPerMin, items, players, championName
			};

			return res;
		} else {
			let res = {
				leftTeam: {
					players: [],
					teamstats: {}
				}, 
				rightTeam: {
					players: [],
					teamstats: {}
				},
				timeline: {...matchInfo.timeline[0]}
			};
			let leftTeamKDA = {kills: 0, deaths: 0, assists: 0}, rightTeamKDA = {kills: 0, deaths: 0, assists: 0};

			for (let elem of participants) {
				const {totalMinionsKilled, visionScore, goldEarned, perks, teamId, kills, deaths, assists} = elem;

				const farmPerMin = scorePerMin(totalMinionsKilled, gameDuration);
				const visionPerMin = scorePerMin(visionScore, gameDuration);
				const goldPerMin = scorePerMin(goldEarned, gameDuration);
				const items = itemsTable(elem, version);
				const spells = await getAllPlayerSpells(elem, version);
				const mainRunes = await getMainPlayerRunes(perks, version);
				const allRunes = playerRunes(perks);
				const teamKills = totalTeamKills(teams, teamId);

				let obj = {...elem, farmPerMin, visionPerMin, items, mainRunes, allRunes, spells, teamKills, goldPerMin};

				if (teamId === 100) {
					res.leftTeam.players.push(obj);
					leftTeamKDA.kills += kills;
					leftTeamKDA.deaths += deaths;
					leftTeamKDA.assists += assists;
				} else {
					res.rightTeam.players.push(obj);
					rightTeamKDA.kills += kills;
					rightTeamKDA.deaths += deaths;
					rightTeamKDA.assists += assists;
				}
			}

			for (let elem of teams) {
				elem.teamId === 100 ? res.leftTeam.teamstats = {...elem, ...leftTeamKDA} : res.rightTeam.teamstats = {...elem, ...rightTeamKDA};
			}

			res.type = matchType;
			res.date = startDate;
			res.duration = duration;
			
			return res;
		}
	}

	return result();
}

export default getMatchInfo;