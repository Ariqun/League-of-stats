import React from 'react'
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import PlayerKDA from '../../../match/components/playerKDA';
import ProgressBar from '../../../../components/progressBars/progressBar';
import RateBar from '../../../../components/progressBars/rateBar';
import AvgBlock from './avgBlock';
import {calcRatio} from '../../../../components/actionsWithNums/calcRatio';
import {findPercent} from '../../../../components/actionsWithNums/findPercent';
import {separateNumWithDot} from '../../../../components/actionsWithNums/checkNums';

const TableBody = ({tab, statistics, sortBy, champions, version}) => {
	const champs = statistics.champions[0];
	const [t] = useTranslation();

	const maxMatches = Object.values(champs).reduce((acc, curr) => {
		let matches = 0;

		if (curr[tab]) matches = curr[tab].results.matches
		if (acc < matches) return matches;
		
		return acc;
	}, 0);

	const result = Object.keys(champs).map(champ => {
		if (champs[champ][tab] === undefined) return null;

		const name = champions[champ].name;
		const {level, score} =  champs[champ];
		const {matches, wins} = champs[champ][tab].results;
		const {creeps, gold, vision} = champs[champ][tab];
		const {kills, deaths, assists} = champs[champ][tab].kda;
		const {magic, physical, trueDmg} = champs[champ][tab].dmg;
		const {restore, shield} = champs[champ][tab].heal;
		
		const mastery = separateNumWithDot(score);
		const winrate = findPercent(wins, matches, 1);
		const avgKills = calcRatio(kills, matches, 1);
		const avgDeaths = calcRatio(deaths, matches, 1);
		const avgAssists = calcRatio(assists, matches, 1);
		const avgRatio =  calcRatio((kills + assists), deaths, 2);
		const avgCreeps =  calcRatio(creeps, matches, 1);
		const avgGold =  separateNumWithDot(calcRatio(gold, matches, 1));
		const avgDmg =  separateNumWithDot(calcRatio((magic + physical + trueDmg), matches));
		const avgHeal =  separateNumWithDot(calcRatio((restore + shield), matches));
		const avgVision = calcRatio(vision, matches, 1);
		
		return(
			<tr className={`champ ${champ}`} key={champ}>
				<td className="general" champ={score}  data-tip={`${t('masteryScore')}: ${mastery}`} data-for="tooltip">
					<div className="wrapper">
						<img src={`${process.env.PUBLIC_URL}/assets/icons/mastery/${level}.png`} alt={`mastery_${level}`}/>
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`} alt={champ}/>
						<span className="name">{name}</span>
					</div>
				</td>

				<td className="matches" games={matches}>
					<ProgressBar current={matches} max={maxMatches}/>
				</td>

				<td className="winrate" winrate={winrate}>
					<RateBar current={wins} max={matches}/>
				</td>

				<td className="avg_kda" kda={avgRatio}>
					<div className="wrapper">
						<PlayerKDA kills={avgKills} deaths={avgDeaths} assists={avgAssists}/>
					</div>
				</td>

				<td className="avg_creeps" creeps={avgCreeps}>
					<AvgBlock type="creeps" value={avgCreeps}/>
				</td>

				<td className="avg_gold" gold={avgGold}>
					<AvgBlock type="gold" value={avgGold}/>
				</td>

				<td className="avg_dmg" dmg={avgDmg}>
					<AvgBlock type="dmg" value={avgDmg}/>
				</td>

				<td className="avg_heal" heal={avgHeal}>
					<AvgBlock type="heal" value={avgHeal}/>
				</td>

				<td className="avg_vision" vision={avgVision}>
					<AvgBlock type="vision" value={avgVision}/>
				</td>
			</tr>
		)
	}).filter(item => item !== null);
	
	if (result.length === 0) {
		return(
			<tr>
				<td className="no_data" colSpan="10">???????? ???? ??????????????</td>
			</tr>
		)
	}

	result.sort((a, b) => {
		if (!a || !b) return null;
		
		let x = null, y = null;
		
		for (let elem of a.props.children) {
			if (elem.props[sortBy] !== undefined) x = elem.props[sortBy];
		}

		for (let elem of b.props.children) {
			if (elem.props[sortBy] !== undefined) y = elem.props[sortBy];
		}

		return y - x;
	})

	return result;
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		champions: state.champions
	};
}

export default connect(mapStateToProps)(TableBody);