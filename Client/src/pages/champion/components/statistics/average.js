import React from 'react';

import {calcRatio} from '../../../../components/manipulationsWithNums/calcRatio';
import PlayerKDA from '../../../match/components/playerKDA';
import AvgBlock from './avgBlock';

const Average = ({champStats}) => {
	const {matches, creeps, gold, kda, dmg, combo} = champStats;
	
	const avgKills = calcRatio(kda.kills, matches, 1);
	const avgDeaths = calcRatio(kda.deaths, matches, 1);
	const avgAssists = calcRatio(kda.assists, matches, 1);
	const avgCreeps = calcRatio(creeps, matches, 1);
	const avgDmg = calcRatio((dmg.physical + dmg.magic + dmg.trueDmg), matches) / 1000;
	const avgGold = calcRatio(gold, matches) / 1000;
	const avgDouble = calcRatio(combo.double, matches, 4);
	const avgTriple = calcRatio(combo.triple, matches, 4);
	const avgQuadro = calcRatio(combo.quadro, matches, 4);
	const avgPenta = calcRatio(combo.penta, matches, 4);

	return(
		<div className="average">
			<div className="avg_title">В среднем за игру</div>

			<div className="avg_wrapper">
				<div className="avg_stat kda col-6">
					<span className="title">KDA</span>
					<PlayerKDA kills={avgKills} deaths={avgDeaths} assists={avgAssists} />
				</div>

				<AvgBlock type="creeps" value={avgCreeps} />
				<AvgBlock type="dmg" value={avgDmg} />
				<AvgBlock type="gold" value={avgGold} />
			</div>

			<div className="avg_combo">
				<AvgBlock type="penta" value={avgPenta} combo />
				<AvgBlock type="quadro" value={avgQuadro} combo />
				<AvgBlock type="triple" value={avgTriple} combo />
				<AvgBlock type="double" value={avgDouble} combo />
			</div>
		</div>
	)
}

export default Average;