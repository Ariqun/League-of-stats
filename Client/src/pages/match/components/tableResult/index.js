import React from 'react';

import Player from '../player';
import TeamScore from '../teamScore';

const TableResult = ({info, version, region}) => {
	return(
		<div className="table_result">
			<div className="table_head">
				<div className="left_team col-4">
					<TeamScore info={info} id={100}/>
				</div>

				<div className="match_type col-4">
					<div className="date">
						<span className="time_date">{info.date}</span>
						<span className="duration">({info.duration})</span>
					</div>
					<span className="type">{info.type}</span>
				</div>

				<div className="right_team col-4">
					<TeamScore info={info} id={200}/>
				</div>
			</div>

			<div className="table_body">
				<div className="left_team">
					<Player team={info.leftTeam} version={version} region={region}/>
				</div>

				<div className="right_team">
					<Player team={info.rightTeam} version={version} region={region}/>
				</div>
			</div>
		</div>
	)
}

export default TableResult;