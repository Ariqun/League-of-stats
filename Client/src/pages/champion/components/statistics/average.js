import React from 'react';

import averageScore from '../../../../components/averageScore';

const Average = ({champStats}) => {
	const {matches, creeps, gold, kda, dmg, combo} = champStats;

	const avgCreeps = averageScore(creeps, matches, 1);
	const avgGold = averageScore(gold, matches) / 1000;
	const avgKills = averageScore(kda.kills, matches, 1);
	const avgDeaths = averageScore(kda.deaths, matches, 1);
	const avgAssists = averageScore(kda.assists, matches, 1);
	const avgKDARatio = averageScore((+avgKills + +avgAssists), +avgDeaths, 1);
	const avgDMG = averageScore((dmg.physical + dmg.magic + dmg.trueDmg), matches) / 1000;
	const avgDouble = averageScore(combo.double, matches, 4);
	const avgTriple = averageScore(combo.triple, matches, 4);
	const avgQuadro = averageScore(combo.quadro, matches, 4);
	const avgPenta = averageScore(combo.penta, matches, 4);

	return(
		<div className="average">
			<div className="avg_title">В среднем за игру</div>

			<div className="avg_wrapper">
				<div className="avg_stat kda col-6">
					<span className="title">KDA</span>
					<div className="value">
						<span className="kills">{avgKills}</span>
						<span> / </span>
						<span className="deaths">{avgDeaths}</span>
						<span> / </span>
						<span className="assists">{avgAssists}</span>
						<span className="ratio"> ({avgKDARatio})</span>
					</div>
				</div>

				<div className="avg_stat creeps col-6">
					<span className="title">Крипы</span>
					<span className="value">{avgCreeps}</span>
				</div>

				<div className="avg_stat dmg col-6">
					<span className="title">Урон</span>
					<span className="value">{avgDMG}</span>
				</div>

				<div className="avg_stat gold col-6">
					<span className="title">Золото</span>
					<span className="value">{avgGold}</span>
				</div>
			</div>

			<div className="avg_combo">
				<div className="avg_stat penta col-3">
					<span className="title">Пентакиллы</span>
					<span className="value">{avgPenta}</span>
				</div>

				<div className="avg_stat qaudro col-3">
					<span className="title">Квадракиллы</span>
					<span className="value">{avgQuadro}</span>
				</div>

				<div className="avg_stat triple col-3">
					<span className="title">Триплкиллы</span>
					<span className="value">{avgTriple}</span>
				</div>

				<div className="avg_stat double col-3">
					<span className="title">Даблкиллы</span>
					<span className="value">{avgDouble}</span>
				</div>
			</div>
		</div>
	)
}

export default Average;