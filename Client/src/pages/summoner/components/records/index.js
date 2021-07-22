import React from 'react';

import Card from './card';
import StatisticsNotFound from '../../../../components/errors/statisticsNotFound';

import './index.sass';

const Records = ({records, matchAmount}) => {
	if (!records) return <StatisticsNotFound matchAmount={matchAmount} />;

	const {kda, kills, deaths, assists, creeps, gold, dmg, healAndShields, dmgTaken, CC, vision, wards, killingSpree, double, triple, quadra, penta} = records[0];
	const basics = {kills, deaths, assists, kda, creeps, gold};
	const impact = {dmg, healAndShields, dmgTaken, CC, vision, wards};
	const combo = {killingSpree, double, triple, quadra, penta};
	const types = [basics, impact, combo];

	const content = types.map(type => {
		return <Card records={type} />;
	})

	return(
		<div className="records">
			<div className="records_wrapper">
				{content}
			</div>
		</div>
	)
}

export default Records;