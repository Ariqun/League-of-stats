import React from 'react';
import {useTranslation} from 'react-i18next';

import CircleCanvas from '../../../../components/сanvases/circleCanvas';

const MainStats = ({champStats}) => {
	const [t] = useTranslation();

	const {wins, matches, totalMatches, bans} = champStats;
	const rates = ['winrate', 'banrate', 'pickrate'];

	const content = rates.map(rate => {
		let secondary = matches - wins;

		if (rate === 'banrate') secondary = totalMatches - bans;
		if (rate === 'pickrate') secondary = totalMatches - matches;

		return(
			<div className={`${rate} graph col-5 col-sm-3 col-lg-2`} key={rate}>
				<div className="graph_title">{t(rate)}</div>
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