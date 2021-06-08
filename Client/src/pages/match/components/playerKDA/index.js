import React from 'react';

import {calcRatio} from '../../../../components/manipulationsWithNums/calcRatio';

import './index.sass';

const PlayerKDA = ({kills, deaths, assists, live}) => {
	let ratio = calcRatio(kills + assists, deaths, 2);

	if (deaths === 0 && live) ratio = ' - ';
	if (kills === 0 && deaths === 0 && assists === 0) ratio = ' - ';
	
	return(
		<div className="kda_score">
			<div className="score_wrapper">
				<span className="kills">{kills}</span>
				<span className="slash"> / </span>
				<span className="deaths">{deaths}</span>
				<span className="slash"> / </span>
				<span className="assists">{assists}</span>
			</div>
			
			<span className="kda_ratio"> ({ratio})</span>
		</div>
	)
}

export default PlayerKDA;