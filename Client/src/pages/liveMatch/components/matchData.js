import React, {useState, useEffect} from 'react';

import {transformMS} from '../../../components/actionsWithNums/transformTime';

const MatchData = ({matchType, startTime}) => {
	const [time, changeTime] = useState(getTime());

	useEffect(() => {
		const timer = setInterval(() => {
			const duration = getTime();
			changeTime(duration);
		}, 1000);
		
		return () => {clearInterval(timer)};
	})

	function getTime() {
		const now = new Date();
		const matchDuration = now - startTime;
		const duration = transformMS(matchDuration, 'digits');

		return duration;
	}

	return(
		<div className="match_data">
			<div className="match_type">{matchType}</div>
			<div className="match_time">{time}</div>
		</div>
	)
}

export default MatchData;