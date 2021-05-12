import React from 'react';
import {connect} from 'react-redux';

import matchDuration from '../getMatchInfo/matchDuration';
import matchStartDate from '../getMatchInfo/matchStartDate';

import Player from '../player';
import TeamScore from '../teamScore';

import './index.sass';

const TableResult = ({info, region, matchTypes}) => {
	const {queueId, gameStartTimestamp, gameDuration} = info;

	const matchType = matchTypes.find(type => type.queueId === queueId);
	const startDate = matchStartDate(gameStartTimestamp);
	const duration = matchDuration(gameDuration);

	return(
		<div className="table_result">
			<div className="table_head">
				<TeamScore teamId={100} info={info} />

				<div className="match_type col-4">
					<div className="date">
						<span className="time_date">{startDate}</span>
						<span className="duration">({duration})</span>
					</div>
					<span className="type">{matchType.description}</span>
				</div>

				<TeamScore teamId={200} info={info} />
			</div>

			<div className="table_body">
				<div className="left_team">
					<Player teamId={100} info={info} region={region}/>
				</div>

				<div className="right_team">
					<Player teamId={200} info={info} region={region}/>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {matchTypes: state.matchTypes}
}

export default connect(mapStateToProps)(TableResult);