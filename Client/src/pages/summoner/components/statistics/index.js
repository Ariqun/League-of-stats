import React from 'react';

import MatchTypes from './matchTypes';
import StatNumbers from './statNumbers';

import './index.sass';

const Statistics = ({statistics}) => {
	const stats = statistics.statistics[0];
	const champs = statistics.champions[0];

	return(
		<div className="statistics">
			<MatchTypes stats={stats}/>
			<StatNumbers stats={champs}/>
		</div>
	)
}

export default Statistics;