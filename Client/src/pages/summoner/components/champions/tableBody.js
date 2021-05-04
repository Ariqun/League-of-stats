import React from 'react'

import averageScore from '../../../../components/averageScore';

const TableBody = ({tab, statistics, sort, version}) => {
	const champs = statistics.champions[0];
	const {totalMatches} = statistics;

	const result = Object.keys(champs).map(champ => {
		if (champs[champ][tab] === undefined) return null;

		const {matches, wins} = champs[champ][tab].results;
		const {cs, gold} = champs[champ][tab];
		const {kills, deaths, assists} = champs[champ][tab].kda;
		const {magic, physical, trueDmg} = champs[champ][tab].dmg;
		const {restore, shield} = champs[champ][tab].heal;
		
		const avgKills = averageScore(kills, matches, 1);
		const avgDeaths = averageScore(deaths, matches, 1);
		const avgAssists = averageScore(assists, matches, 1);
		const avgRatio =  averageScore((kills + assists), deaths, 2);
		const avgCreeps =  averageScore(cs, matches, 1);
		const avgGold =  averageScore(gold, matches, 1);
		const avgDmg =  averageScore((magic + physical + trueDmg), matches) / 1000;
		const avgHeal =  averageScore((restore + shield), matches) / 1000;
		
		return(
			<tr className={`champ ${champ}`} key={champ}>
				<td className="general" champ={champ}>
					<div className="wrapper">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`} alt={champ}/>
						<span className="name">{champ}</span>
					</div>
				</td>

				<td className="matches" matches={matches}>
					<div className="wrapper">
						<progress max={totalMatches} value={matches}/>
						<span className="value">{matches}</span>
					</div>
				</td>

				<td className="winrate" winrate={(wins * 100 / matches)}>
					<div className="wrapper">
						<progress max={matches} value={wins}/>
						<span className="value">{(wins * 100 / matches).toFixed(1)}%</span>
					</div>
				</td>

				<td className="avg_kda" kda={avgRatio}>
					<div className="wrapper">
						<div className="kda_score">
							<span className="kills">{avgKills}</span>
							<span> / </span>
							<span className="deaths">{avgDeaths}</span>
							<span> / </span>
							<span className="assists">{avgAssists} </span>
							<span className="kda_ratio">&ensp;({avgRatio})</span>
						</div>
					</div>
				</td>

				<td className="avg_creeps" creeps={avgCreeps}>
					<div className="wrapper">
						<img src={process.env.PUBLIC_URL + '/assets/icons/cs.png'} alt="cs"/>
						<span className="value">{avgCreeps}</span>
					</div>
				</td>

				<td className="avg_gold" gold={avgGold}>
					<div className="wrapper">
						<img src={process.env.PUBLIC_URL + '/assets/icons/gold.png'} alt="gold"/>
						<span className="value">{avgGold}</span>
					</div>
				</td>

				<td className="avg_dmg" dmg={avgDmg}>
					<div className="wrapper">
						<img src={process.env.PUBLIC_URL + '/assets/icons/dmg.png'} alt="dmg"/>
						<span className="value">{avgDmg}</span>
					</div>
				</td>

				<td className="avg_heal" heal={avgHeal}>
					<div className="wrapper">
						<img src={process.env.PUBLIC_URL + '/assets/icons/heal.png'} alt="dmg"/>
						<span className="value">{avgHeal}</span>
					</div>
				</td>
			</tr>
		)
	})

	if (result[0] === null) return <tr><td className="no_data">Игры не найдены</td></tr>;
	
	result.sort((a, b) => {
		let x = null, y = null;

		for (let elem of a.props.children) {
			if (elem.props[sort] !== undefined) x = elem.props[sort];
		}

		for (let elem of b.props.children) {
			if (elem.props[sort] !== undefined) y = elem.props[sort];
		}

		return y - x;
	})

	return result;
}

export default TableBody;