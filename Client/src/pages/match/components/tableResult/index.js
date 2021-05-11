import React from 'react';

import Player from '../player';
import TeamScore from '../teamScore';

import './index.sass';

const TableResult = ({info, region}) => {
	const {date, duration, type, leftTeam, rightTeam} = info;
	
	return(
		<div className="table_result">
			<div className="table_head">
				<div className="left_team col-4">
					<TeamScore team={leftTeam}/>
				</div>

				<div className="match_type col-4">
					<div className="date">
						<span className="time_date">{date}</span>
						<span className="duration">({duration})</span>
					</div>
					<span className="type">{type}</span>
				</div>

				<div className="right_team col-4">
					<TeamScore team={rightTeam}/>
				</div>
			</div>

			<div className="table_body">
				<div className="left_team">
					<Player team={leftTeam} region={region}/>
				</div>

				<div className="right_team">
					<Player team={rightTeam} region={region}/>
				</div>
			</div>
		</div>
	)
}

export default TableResult;