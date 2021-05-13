import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import PlayerKDA from '../../match/components/getMatchInfo/playerKDA';
import PlayerSpells from '../../match/components/getMatchInfo/playerSpells';
import Loading from '../../../components/loading';
import {ranks} from '../../../components/languages/russian/ranks';
import {findPercent} from '../../../components/manipulationsWithNums/findPercent';
import {calcRatio} from '../../../components/manipulationsWithNums/calcRatio';

import DataBase from '../../../services/dataBase';
import RiotAPI from '../../../services/riotAPI';


const Card = ({player, region = 'ru', champions, runes}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champion, setChampion] = useState('');
	const [summoner, setSummoner] = useState({});
	const [ranked, setRanked] = useState([]);
	const db = new DataBase();
	const riotAPI = new RiotAPI();

	const {summonerId, championId, summonerName, spell1Id, spell2Id} = player

	useEffect(() => {
		const getInfo = async () => {
			const champRes = await db.getChampionStats(championId);
			const sumRes = await db.getSumStatistics(summonerId);
			const rankRes = await riotAPI.getSumRanked(summonerId, region);

			setChampion(champRes);
			setSummoner(sumRes);
			setRanked(rankRes)
			changeLoading(false);
		}
		getInfo();
	}, [])

	if (isLoading) return <Loading />

	const name = Object.keys(champions).filter(champ => +champions[champ].key === championId);
	let champWins = 0, champMatches = 0, champWinrate = 0, champKills = 0, champDeaths = 0, champAssists = 0;

	const {tier, rank, leaguePoints, wins, losses} = ranked;
	const matches = wins + losses;
	const winrate = (wins * 100 / matches).toFixed();
	const ruRanks = ranks();

	const {perkStyle, perkSubStyle} = player.perks;
	const prim = runes.find(rune => rune.id === perkStyle);
	const main = prim.slots[0].runes[0];
	const sub = runes.find(rune => rune.id === perkSubStyle);
	
	if (summoner.length !== 0 && summoner.champions[0][name]) {
		const champ = summoner.champions[0][name];

		champWins = champ.total.results.wins;
		champMatches = champ.total.results.matches;
		champWinrate = findPercent(champWins, champMatches);
		
		champKills = calcRatio(champ.total.kda.kills, champMatches, 1);
		champDeaths = calcRatio(champ.total.kda.deaths, champMatches, 1);
		champAssists = calcRatio(champ.total.kda.assists, champMatches, 1);
	}

	const detectRole = () => {
		const arr = [];

		for (let key in champion.roles) {
			if (!champion.roles[key][0]) arr.push({[key]: 0});
			if (champion.roles[key][0]) arr.push({[key]: champion.roles[key][0].matches});
		}
	
		arr.sort((a, b) => {
			const keyA = Object.keys(a)[0];
			const keyB = Object.keys(b)[0];
	
			return b[keyB] - a[keyA];
		})

		return Object.keys(arr[0])[0];
	}
	
	const role = detectRole();

	return(
		<div className={`player_card ${role} col-2`}>
			<div className="player_name">{summonerName}</div>

			<div className="champ_stats">
				<div className="winrate">{champWinrate}% <span>({champMatches} всего)</span></div>

				<PlayerKDA kills={champKills} deaths={champDeaths} assists={champAssists}/>
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
					<img src={process.env.PUBLIC_URL + `/assets/icons/positions/${role}.png`} alt={`${role}_icon`}/>
				</div>

				<PlayerSpells firstId={spell1Id} secondId={spell2Id}/>
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