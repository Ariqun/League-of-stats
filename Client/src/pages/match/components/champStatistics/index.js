import React from 'react';

import Team from './team';

import './index.sass';

const ChampStatistics = ({info, version}) => {
	const {leftTeam, rightTeam} = info;

	return(
		<div className="champion_statistic">
			<div className="tabs">
				<div className="left_team">
					<Team team={leftTeam} version={version}/>
				</div>

				<div className="table">

				</div>

				<div className="right_team">
					<Team team={rightTeam} version={version}/>
				</div>
			</div>

			<div className="content">

			</div>
		</div>
	)
}

export default ChampStatistics;