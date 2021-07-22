import React from 'react';
import {useTranslation} from 'react-i18next';

import StatNumbers from './statNumbers';
import CircleCanvas from '../../../../components/сanvases/circleCanvas';
import StatisticsNotFound from '../../../../components/errors/statisticsNotFound';

import './index.sass';

const Statistics = ({statistics, matchAmount}) => {
	const [t] = useTranslation();

	if (!statistics) return <StatisticsNotFound matchAmount={matchAmount} />;

	const types = ['total', 'normal', 'solo', 'flex', 'clash'];
	const stats = statistics.statistics[0];
	const champs = statistics.champions[0];

	const content = Object.keys(stats).map(type => {
		if (stats[type] === undefined) return <div className="no_data" key={type}>{t('noData')}</div>;

		const {matches, wins} = stats[type];
		const losses = matches - wins;
		const matchType = types.find(item => item === type);

		return(
			<div className={`type ${type}`} key={type}>
				<div className="type_head">
					<div className="type_title">{t(matchType)}</div>

					<CircleCanvas primary={wins} secondary={losses} width="200" height="200"/>

					<div className="total_matches">{t('gamesPlayed')}: {matches}</div>
				</div>
				
				<StatNumbers champs={champs} type={type}/>
			</div>
		)
	});

	return(
		<div className="statistics">
			<div className="match_type">
				{content}
			</div>
		</div>
	)
}

export default Statistics;