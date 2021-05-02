import React from 'react';

import CircleCanvas from './circleCanvas';

const MainStats = ({champStats}) => {
	const {wins, matches, totalMatches, bans} = champStats;

	return(
		<div className="main_stats">
			<div className="winrate graph col-2">
				<div className="graph_title">Винрейт</div>
				<CircleCanvas value={wins} total={matches} mode='winrate'/>
			</div>

			<div className="banrate graph col-2">
				<div className="graph_title">Банрейт</div>
				<CircleCanvas value={bans} total={totalMatches} mode='banrate'/>
			</div>

			<div className="pickrate graph col-2">
				<div className="graph_title">Пикрейт</div>
				<CircleCanvas value={matches} total={totalMatches} mode='pickrate'/>
			</div>
		</div>
	);
}

export default MainStats;