import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {ranks} from '../../../components/languages/russian/ranks';

import Loading from '../../../components/loading';
import DataBase from '../../../services/dataBase';
import RiotAPI from '../../../services/riotAPI';

const Card = ({player, region = 'ru', champions, runes, spells}) => {
	const [isLoading, changeLoading] = useState(true);
	const [summoner, setSummoner] = useState({});
	const [ranked, setRanked] = useState([]);
	const db = new DataBase();
	const riotAPI = new RiotAPI();

	const {summonerId, championId, summonerName} = player

	useEffect(() => {
		const getInfo = async () => {
			const sumRes = await db.getSumStatistics(summonerId);
			const rankRes = await riotAPI.getSumRanked(summonerId, region);

			setSummoner(sumRes);
			setRanked(rankRes)
			changeLoading(false);
		}
		getInfo();
	}, [])

	if (isLoading) return <Loading />

	console.log(player);
	// console.log(runes);
	// console.log(spells);

	const {tier, rank, leaguePoints, wins, losses} = ranked;
	const matches = wins + losses;
	const winrate = (wins * 100 / matches).toFixed();
	const ruRanks = ranks();

	const name = Object.keys(champions).filter(champ => +champions[champ].key === championId);
	let champWins = 0, champMatches = 0, champWinrate = 0, champKills = 0, champDeaths = 0, champAssists = 0;

	const {perkIds, perkStyle, perkSubStyle} = player.perks;
	const prim = runes.find(rune => rune.id === perkStyle);
	const main = prim.slots[0].runes[0];
	const sub = runes.find(rune => rune.id === perkSubStyle);

	// const {spell1Id, spell2Id} = player;
	// const spellOne = Object.keys(spells).find(spell => +spells[spell].key === spell1Id);
	// const spellOne = spells.find(spell => +spell.key === spell1Id);
	// const spellTwo = spells.find(spell => +spell.key === spell2Id);
	// console.log(spellOne);
	
	if (summoner.length !== 0 && summoner.champions[0][name]) {
		const champ = summoner.champions[0][name];

		champWins = champ.total.results.wins;
		champMatches = champ.total.results.matches;
		champWinrate = (champWins * 100 / champMatches).toFixed();

		champKills = (champ.total.kda.kills / champMatches).toFixed(1);
		champDeaths = (champ.total.kda.deaths / champMatches).toFixed(1);
		champAssists = (champ.total.kda.assists / champMatches).toFixed(1);
	}

	return(
		<div className="player_card col-2">
			<div className="player_name">{summonerName}</div>

			<div className="champ_stats">
				<div className="winrate">{champWinrate}% <span>({champMatches} всего)</span></div>
				<div className="kda">
					<span className="kills">{champKills}</span>
					<span className="slash"> / </span>
					<span className="deaths">{champDeaths}</span>
					<span className="slash"> / </span>
					<span className="assists">{champAssists}</span>
				</div>
			</div>

			<div className="player_rank">
				<div className="rank_icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/${tier}.png`} alt={`${tier}_emblem`}></img>
				</div>
				<div className="rank_wrapper">
					<div className="rank_name">{ruRanks[tier.toLowerCase()]} {rank}</div>
					<span className="rank_lp">LP: &nbsp;{leaguePoints}</span>
					<span className="matches">{winrate}% <span>({matches} всего)</span></span>
				</div>
			</div>

			<div className="player_settings">
				<div className="runes">
					<div className="rune prim"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${main.icon}`} alt={`${main.name}_icon`}/></div>
					<div className="rune sub"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${sub.icon}`} alt={`${sub.name}_icon`}/></div>
				</div>

				<div className="role">

				</div>

				<div className="spells">
					{/* <div className="spell one"><img src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/${spellOne.image.full}`} alt={`${spellOne.name}_icon`}/></div> */}
					{/* <div className="spell two"><img src={`http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/${spellTwo.image.full}`} alt={`${spellTwo.name}_icon`}/></div> */}
				</div>
			</div>

			<div className="background">
				<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name[0]}_0.jpg`} alt={`${name}_img`}/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		champions: state.champions,
		runes: state.runes,
		spells: state.spells
	}
}

export default connect(mapStateToProps)(Card);