import React, {useState, useEffect} from 'react';

import Loading from '../loading/loading';

import RiotAPI from '../services/riotAPI';
import DragonData from '../services/dragonData';

function MatchItem({version, matchID, name}) {
	const riotAPI = new RiotAPI();
	const dragonData = new DragonData();
	const [isLoading, setLoading] = useState(true);
	const [matchInfo, setMatchInfo] = useState({});
	const [spellOne, setSpellOne] = useState('');
	const [spellTwo, setSpellTwo] = useState('');

	useEffect(() => {
		const getMatchInfo = async () => {
			await riotAPI.getMatchInfo(matchID)
				.then(res => {
					setMatchInfo(res)
					setLoading(false)
				})
		}
		getMatchInfo();
		
		// const {participants} = matchInfo;
		// let playerInfo = {};

		// for (let elem of participants) {
		// 	if (elem.summonerName === name) {
		// 		playerInfo = {...elem};
		// 	}
		// }

		// const {spell1Id, spell2Id} = playerInfo;

		// const getSumSpell = async (id, num) => {
		// 	await dragonData.getSummonerSpell(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ru_RU/summoner.json`, id)
		// 		.then(res => {
		// 			if (num === 1) {
		// 				setSpellOne(res)
		// 			} else {
		// 				setSpellTwo(res)
		// 			}
		// 		})
		// }

		// getSumSpell(spell1Id, 1);
		// getSumSpell(spell2Id, 2);
	}, [])


	// const getMatchInfo = async () => {
	// 	await riotAPI.getMatchInfo(matchID)
	// 		.then(res => {
	// 			setMatchInfo(res)
	// 			setLoading(false)
	// 		})
	// }

	// const getSumSpells = async (id, num) => {
	// 	await dragonData.getSummonerSpell(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ru_RU/summoner.json`, id)
	// 		.then(res => {
	// 			if (num === 1) {
	// 				setSpellOne(res)
	// 			} else {
	// 				setSpellTwo(res)
	// 			}
	// 		})
	// }

	const createMatch = () => {
		// const {participants} = matchInfo;
		// let playerInfo = {};

		// for (let elem of participants) {
		// 	if (elem.summonerName === name) {
		// 		playerInfo = {...elem};
		// 	}
		// }

		// const {championName, spell1Id, spell2Id} = playerInfo;
		// getSumSpell(spell1Id, 1);
		// getSumSpell(spell2Id, 2);
		console.log(spellOne)
		console.log(spellTwo)
		// console.log(playerInfo)
		console.log(matchInfo)

		// const spell = dragonData.getSummonerSpell(`http://ddragon.leagueoflegends.com/cdn/11.8.1/data/ru_RU/summoner.json`, spell1Id)

		return(
			<div className="match_item">
				<div className="inner_wrapper">
					<div className="game_setting">
						<div className="champion_icon">
							{/* <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt={`${championName}_icon`}/> */}
						</div>
						<div className="summoner_spells">
							<div className="spell_one">
								{/* <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${sumSpellOne}.png`} alt={`${sumSpellOne}_icon`}/> */}
							</div>
						</div>
						<div className="runes">

						</div>
					</div>

					<div className="game_stats">
						<div className="time">
							<span className="date"></span>
							<span className="duration"></span>
						</div>

						<div className="champion_stats">
							<span className="kda"></span>
							<span className="farm"></span>
							<span className="kill_part"></span>
						</div>

						<div className="champ_items">

						</div>
					</div>

					<div className="game_participants">

					</div>
				</div>
			</div>
		)
	}
	
	if (isLoading) {
		return <Loading/>
	}
	
	const result = createMatch();

	return(
		<div>
			{result}
		</div>
	)
}

export default MatchItem;