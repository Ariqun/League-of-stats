import React from 'react';

import CircleCanvas from '../../../../components/сanvases/circleCanvas';
import CC from './circleCanvas';

const MainStats = ({champStats}) => {
	const {wins, matches, totalMatches, bans} = champStats;
	const types = ['winrate', 'banrate', 'pickrate'];

	const content = types.map(type => {
		let secondary = matches - wins;

		if (type === 'banrate') secondary = totalMatches - bans;
		if (type === 'pickrate') secondary = totalMatches - matches;

		return(
			<div className={`${type} graph col-2`}>
				<div className="graph_title">{type}</div>
				<CircleCanvas primary={wins} secondary={secondary} width="200" height="200" mode="hidden"/>
			</div>
		)
	})

	return(
		<div className="main_stats">
			{content}
			{/* <div className="winrate graph col-2">
				<div className="graph_title">Винрейт</div>
				<CircleCanvas value={wins} total={matches} mode='winrate'/>
				<CircleCanvas primary={wins} secondary={matches - wins} width="200" height="200"/>
				
			</div>

			<div className="banrate graph col-2">
				<div className="graph_title">Банрейт</div>
				<CircleCanvas value={bans} total={totalMatches} mode='banrate'/>
				<CircleCanvas primary={bans} secondary={totalMatches - bans} width="200" height="200"/>
			</div>

			<div className="pickrate graph col-2">
				<div className="graph_title">Пикрейт</div>
				<CC value={matches} total={totalMatches} mode='pickrate'/>
				<CircleCanvas primary={matches} secondary={totalMatches - matches} width="200" height="200"/>
			</div> */}
		</div>
	);
}

export default MainStats;