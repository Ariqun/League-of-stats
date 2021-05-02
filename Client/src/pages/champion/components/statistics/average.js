import React from 'react';

import checkNum from '../../../../components/chekNum';

const Average = ({champStats}) => {
	const {matches, creeps, gold, kda, dmg, combo} = champStats;
	const avgCreeps = checkNum((creeps / matches).toFixed(1));
	const avgGold = checkNum((gold / matches / 1000).toFixed(3));
	const avgKills = checkNum((kda.kills / matches).toFixed(1));
	const avgDeaths = checkNum((kda.deaths / matches).toFixed(1));
	const avgAssists = checkNum((kda.assists / matches).toFixed(1));
	const avgKDARatio = checkNum(((+avgKills + +avgAssists) / +avgDeaths).toFixed(1));
	const avgDMG = checkNum(((dmg.physical + dmg.magic + dmg.trueDmg) / matches / 1000).toFixed(3) );
	const avgDouble = checkNum((combo.double / matches).toFixed(4));
	const avgTriple = checkNum((combo.triple / matches).toFixed(4));
	const avgQuadro = checkNum((combo.quadro / matches).toFixed(4));
	const avgPenta = checkNum((combo.penta / matches).toFixed(4));

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