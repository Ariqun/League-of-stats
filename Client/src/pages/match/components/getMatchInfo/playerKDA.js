import React from 'react';
import {calcRatio} from '../../../../components/manipulationsWithNums/calcRatio';

const PlayerKDA = ({kills, deaths, assists}) => {
	const ratio = calcRatio(kills + assists, deaths, 2);

	return(
		<div className="kda_score">
			<div className="score_wrapper">
				<span className="kills">{kills}</span>
				<span className="slash"> / </span>
				<span className="deaths">{deaths}</span>
				<span className="slash"> / </span>
				<span className="assists">{assists}</span>
			</div>
			<span className="kda_ratio">&ensp;({ratio})</span>
		</div>
	)
}

export default PlayerKDA;