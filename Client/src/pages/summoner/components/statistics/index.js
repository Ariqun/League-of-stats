import React from 'react';

import StatNumbers from './statNumbers';
import CircleCanvas from '../../../../components/сanvases/circleCanvas';
import StatisticsNotFound from '../../../../components/errors/statisticsNotFound';

import './index.sass';

const Statistics = ({statistics, matchAmount}) => {
	if (!statistics) return <StatisticsNotFound matchAmount={matchAmount}/>

	const types = {normal: 'Обычные', solo: 'Одиночные', flex: 'Флекс', clash: 'Clash', total: 'Ранговые, обычные и clash'};
	const stats = statistics.statistics[0];
	const champs = statistics.champions[0];

	const content = Object.keys(stats).map(type => {
		if (stats[type] === undefined) return <div className="no_data" key={type}>Нет данных</div>

		const {matches, wins} = stats[type];
		const losses = matches - wins;

		return(
			<div className={`type ${type}`} key={type}>
				<div className="type_head">
					<div className="type_title">{types[type]}</div>
					<CircleCanvas primary={wins} secondary={losses} width="200" height="200"/>
					<div className="total_matches">Всего игр: {matches}</div>
				</div>
				
				<StatNumbers champs={champs} type={type}/>
			</div>
		)
	})

	return(
		<div className="statistics">
			<div className="match_type">
				{content}
			</div>
		</div>
	)
}

export default Statistics;