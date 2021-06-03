import React from 'react';

import CircleCanvas from '../../../../components/сanvases/circleCanvas';
import {champRates} from '../../../../components/languages/russian/champ';

const MainStats = ({champStats}) => {
	const {wins, matches, totalMatches, bans} = champStats;
	const rates = ['winrate', 'banrate', 'pickrate'];
	const ruRates = champRates();

	const content = rates.map(rate => {
		let secondary = matches - wins;

		if (rate === 'banrate') secondary = totalMatches - bans;
		if (rate === 'pickrate') secondary = totalMatches - matches;

		return(
			<div className={`${rate} graph col-2`} key={rate}>
				<div className="graph_title">{ruRates[rate]}</div>
				<CircleCanvas primary={wins} secondary={secondary} width="200" height="200" mode="hidden"/>
			</div>
		)
	})

	return(
		<div className="main_stats">
			{content}
		</div>
	);
}

export default MainStats;