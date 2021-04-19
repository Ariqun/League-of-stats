import React, {useState, useEffect} from 'react';

import Loading from '../loading/loading';

import RiotAPI from '../services/riotAPI';
import DragonData from '../services/dragonData';

function MatchItem({version, matchID, name}) {
	const [isLoading, setLoading] = useState(true);
	const [matchInfo, setMatchInfo] = useState({});
	const [playerInfo, setPlayerInfo] = useState({});
	const [spells, setSpells] = useState([]);
	const [rune, setRune] = useState('');

	const riotAPI = new RiotAPI();
	const dragonData = new DragonData();
	
	useEffect(() => {
		const getMatchInfo = async () => {
			const res = await riotAPI.getMatchInfo(matchID);
			setMatchInfo(res);

			let player = {};
			for (let elem of res.participants) {
				if (elem.summonerName === name) {
					player = {...elem};
				}
			}
			setPlayerInfo(player)

			const {spell1Id, spell2Id, perks} = player;
			const style = perks.styles[0].style;
			const perk = perks.styles[0].selections[0].perk;

			await getSumSpell(spell1Id);
			await getSumSpell(spell2Id);
			await getRune(style, perk);

			setLoading(false);
		}
		getMatchInfo();
	}, [])

	const getSumSpell = async (id) => {
		if (spells.length >= 2) return;

		const res = await dragonData.getSummonerSpell(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/summoner.json`, id);

		setSpells(spells => ([...spells, res]));
	}

	const getRune = async (style, perk) => {
		if (rune.length !== 0) return;
		
		const res = await dragonData.getRune(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/runesReforged.json`, style, perk)
		
		setRune(res);
	}

	const addZero = (num) => {
		if ((num + '').length <= 1) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	const getGameStartDate = (time) => {
		const date = new Date(time);
		const transform = `
			${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())} 
			${addZero(date.getHours())}:${addZero(date.getMinutes())}
		`;

		return transform;
	}

	const getGameDuration = (time) => {
		const seconds = addZero(Math.floor(time / (1000) % 60));
		const minutes = addZero(Math.floor(time / (1000 * 60) % 60));
		const hours = addZero(Math.floor(time / (1000 * 60 * 60) % 24));
		let duration = '';

		if (time >= 3600000) {
			duration = `${hours}:${minutes}:${seconds}`
		} else {
			duration = `${minutes}:${seconds}`
		}

		return duration;
	}

	const getTotalTeamKills = (teams, id) => {
		let result = 0;

		for (let elem of teams) {
			if (elem.teamId === id) {
				result = elem.objectives.champion.kills;
			}
		}

		return result;
	}

	const getItemsTable = () => {
		let items = [];
		
		for(let key in playerInfo) {
			if (key.match(/item[\d]/)) {
				items.push(playerInfo[key])
			}
		}
		
		return(
			<div className="items_block">
				{items.map(item => {
					if (item === 0) return <div className="item" key={item}></div>

					return(
						<div className="item" key={item}>
							<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt={`${item}_icon`}/>
						</div>
					)
				})}
			</div>
		)
	}

	const getPlayersTable = () => {
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
				<div className="player" key={player.name}>
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

	const getFarmPerMin = (cs, dur) => {
		return (cs / ((dur / (1000*60)))).toFixed(1);
	}

	const createMatch = () => {
		if (isLoading) return <Loading/>;
		
		const {championName, kills, deaths, assists, totalMinionsKilled, teamId} = playerInfo;
		const {teams, gameStartTimestamp, gameDuration} = matchInfo;

		const startDate = getGameStartDate(gameStartTimestamp);
		const duration = getGameDuration(gameDuration);
		const totalTeamKills = getTotalTeamKills(teams, teamId);
		const farmPerMin = getFarmPerMin(totalMinionsKilled, gameDuration);
		const items = getItemsTable();
		const players = getPlayersTable();
		console.log(matchInfo)
		console.log(playerInfo)

		return(
			<div className="match_item">
				<div className="inner_wrapper">
					<div className="game_settings">
						<div className="champion_icon">
							<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt={`${championName}_icon`}/>
						</div>
						<div className="spells">
							<div className="sum_spells">
								{spells.map(spell => {return <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png`} alt={`${spell}_icon`} key={spell}/>})}
							</div>
							<div className="rune">
								<img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`} alt={`${rune}_icon`}/>
							</div>
						</div>
					</div>

					<div className="game_stats">
						<div className="time">
							<span className="date">{startDate}</span>
							<span className="duration">&ensp;({duration})</span>
						</div>

						<div className="champion_stats">
							<div className="kda_score">
								<span className="kills">{kills}</span>
								<span> / </span>
								<span className="deaths">{deaths}</span>
								<span> / </span>
								<span className="assists">{assists} </span>
								<span className="kda_ratio">&ensp;({((kills + assists) / deaths).toFixed(2)})</span>
							</div>
							<div className="farm_score">
								<span className="farm">{totalMinionsKilled} </span>
								<span className="farm_per_min">({farmPerMin})</span>
								<span> CS</span>
							</div>
							<span className="kill_part">{((kills + assists) * 100 / totalTeamKills).toFixed()}% уч. в уб.</span>
						</div>
					</div>

					<div className="champ_items">
						{items}
					</div>

					<div className="game_players">
						{players}
					</div>
				</div>
			</div>
		)
	}
	
	const render = () => {
		const result = createMatch();

		return(
			<>
				{result}
			</>
		)
	}
	
	return render();
}

export default MatchItem;