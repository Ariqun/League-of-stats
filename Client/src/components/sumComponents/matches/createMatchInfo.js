// import React, {useState, useEffect} from 'react';

import RiotAPI from '../../services/riotAPI';
import DragonData from '../../services/dragonData';

function CreateMatchInfo(matchId, version, name, mini) {
	const riotAPI = new RiotAPI();
	const dragonData = new DragonData();
	let matchInfo = {}, playerInfo = {};

	const getMatchInfo = async () => {
		const res = await riotAPI.getMatchInfo(matchId);
		matchInfo = {...res};
	}
	
	const getMatchType = async (id) => {
		return await dragonData.getGameType(`http://static.developer.riotgames.com/docs/lol/queues.json`, id);
	}

	const getSumSpell = async (id) => {
		return await dragonData.getSummonerSpell(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/summoner.json`, id);
	}

	const getRune = async (style, perk) => {
		return await dragonData.getRune(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/runesReforged.json`, style, perk);
	}

	const getSubStyle = async (style) => {
		return await dragonData.getStyle(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/runesReforged.json`, style);
	}

	const addZero = (num) => {
		if ((num + '').length <= 1) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	const getMatchStartDate = (time) => {
		const date = new Date(time);
		const transform = `
			${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())} 
			${addZero(date.getHours())}:${addZero(date.getMinutes())}
		`;
		
		return transform;
	}

	const getMatchDuration = (time) => {
		const seconds = addZero(Math.floor(time / (1000) % 60));
		const minutes = addZero(Math.floor(time / (1000 * 60) % 60));
		const hours = addZero(Math.floor(time / (1000 * 60 * 60) % 24));
	
		if (time >= 3600000) {
			return `${hours}:${minutes}:${seconds}`
		} else {
			return `${minutes}:${seconds}`
		}
	}

	const getMatchResult = (id) => {
		for (let team of matchInfo.teams) {
			if (team.teamId === id) {
				return(<span className={team.win ? 'win' : 'defeat'}>{team.win ? 'Победа' : 'Поражение'}</span>);
			}
		}
	}

	const getTotalTeamKills = (teams, id) => {
		for (let elem of teams) {
			if (elem.teamId === id) {
				return elem.objectives.champion.kills;
			}
		}
	}

	const getItemsTable = (player) => {
		let items = [];
		
		for(let key in player) {
			if (key.match(/item[\d]/)) {
				items.push(player[key])
			}
		}
		
		return(
			<div className="items_block">
				{items.map((item, i) => {
					if (item === 0) return <div className="item" key={`${item}_${i}`}></div>

					return(
						<div className="item" key={`${item}_${i}`}>
							<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt={`${item}_icon`}/>
						</div>
					)
				})}
			</div>
		)
	}

	const getPlayersTable = (currentPlayer) => {
		const {participants} = matchInfo;
		const leftTeam = [];
		const rightTeam = [];

		for (let player of participants) {
			const obj = {
				name: player.summonerName,
				champ: player.championName
			}

			if (player.teamId === 100) {
				leftTeam.push(obj)
			} else if(player.teamId === 200) {
				rightTeam.push(obj);
			}
		}

		const createDOM = (player) => {
			return(
				<div className={currentPlayer === player.name ? 'current_player' : 'player'} key={player.name}>
					<div className="champion_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.champ}.png`} alt={`${player.champ}_icon`}/>
					</div>
					<div className="player_name">
						<span>{player.name}</span>
					</div>
				</div>
			)
		}

		return(
			<div className="players_block">
				<div className="left_team">
					{leftTeam.map(player => {return createDOM(player)})}
				</div>
				<div className="right_team">
					{rightTeam.map(player => {return createDOM(player)})}
				</div>
			</div>
		)
	}

	const getScorePerMin = (score, dur) => {
		return (score / ((dur / (1000*60)))).toFixed(1);
	}

	const getAllPlayerSpells = async (player) => {
		const {summoner1Id, summoner2Id} = player;
		const res = [await getSumSpell(summoner1Id), await getSumSpell(summoner2Id)];
		return res;
	}

	const getMainPlayerRunes = async (perks) => {
		const primStyle = perks.styles[0].style;
		const primPerk = perks.styles[0].selections[0].perk;
		const subStyle = perks.styles[1].style;
		const res = [];
		
		res.push(await getRune(primStyle, primPerk));
		res.push(await getSubStyle(subStyle));

		return res;
	}

	const getAllPlayerRunes = (player) => {
		let runes = {prim: [], sub: [], stat: []};

		for (let style of player.styles) {
			if (style.description === 'primaryStyle') {
				for (let elem of style.selections) {
					runes.prim.push(elem.perk);
				}
			} else if (style.description === 'subStyle') {
				for (let elem of style.selections) {
					runes.sub.push(elem.perk);
				}
			}
		}

		for (let key in player.statPerks) {
			runes.stat.push(player.statPerks[key]);
		}

		return runes;
	}

	const getSumRankedInfo = async (region, sumId) => {
		return await riotAPI.getSumRanked(region, sumId);
	}
	
	const result = async () => {
		await getMatchInfo();

		const {platformId, queueId, participants, teams, gameStartTimestamp, gameDuration} = matchInfo;
		const matchType = await getMatchType(queueId);
		const duration = getMatchDuration(gameDuration);
		const startDate = getMatchStartDate(gameStartTimestamp);

		if (mini) {
			for (let elem of participants) {
				if (elem.summonerName === name) {
					playerInfo = {...elem};
				}
			}
			
			const {summonerName, championName, kills, deaths, assists, totalMinionsKilled, teamId, perks} = playerInfo;

			const mainRunes = await getMainPlayerRunes(perks);
			const spells = await (getAllPlayerSpells(playerInfo));
			const matchResult = getMatchResult(teamId);
			const totalTeamKills = getTotalTeamKills(teams, teamId);
			const farmPerMin = getScorePerMin(totalMinionsKilled, gameDuration);
			const items = getItemsTable(playerInfo);
			const players = getPlayersTable(summonerName);

			let res = {
				spells, mainRunes, matchType, kills, deaths, assists, platformId, startDate, duration, matchResult, totalTeamKills, totalMinionsKilled, farmPerMin, items, players, championName
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
				}
			};
			let leftTeamKDA = {kills: 0, deaths: 0, assists: 0}, rightTeamKDA = {kills: 0, deaths: 0, assists: 0};

			for (let elem of participants) {
				const {totalMinionsKilled, visionScore, goldEarned, perks, teamId, kills, deaths, assists} = elem;

				const farmPerMin = getScorePerMin(totalMinionsKilled, gameDuration);
				const visionPerMin = getScorePerMin(visionScore, gameDuration);
				const goldPerMin = getScorePerMin(goldEarned, gameDuration);
				const items = getItemsTable(elem);
				const spells = await (getAllPlayerSpells(elem));
				const mainRunes = await getMainPlayerRunes(perks);
				const allRunes = getAllPlayerRunes(perks);
				const totalTeamKills = getTotalTeamKills(teams, teamId);
				// const rankedInfo = await getSumRankedInfo(platformId, summonerId);

				let obj = {...elem, farmPerMin, visionPerMin, items, mainRunes, allRunes, spells, totalTeamKills, goldPerMin};

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

export default CreateMatchInfo;