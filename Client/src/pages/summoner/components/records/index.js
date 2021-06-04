import React from 'react';

import Card from './card';
import StatisticsNotFound from '../../../../components/errors/statisticsNotFound';

import './index.sass';

const Records = ({records, matchAmount}) => {
	if (!records) return <StatisticsNotFound matchAmount={matchAmount}/>

	const {kda, kills, deaths, assists, creeps, gold, dmg, healAndShields, dmgTaken, CC, vision, wards, killingSpree, double, triple, quadra, penta} = records[0];
	const basics = {kills, deaths, assists, kda, creeps, gold};
	const impact = {dmg, healAndShields, dmgTaken, CC, vision, wards};
	const combo = {killingSpree, double, triple, quadra, penta};

	return(
		<div className="records">
			<div className="records_wrapper">
				<div className="block basics">
					<Card records={basics}/>
				</div>

				<div className="block impact">
					<Card records={impact}/>
				</div>

				<div className="block combo">
					<Card records={combo}/>
				</div>
			</div>
		</div>
	)
}

export default Records;