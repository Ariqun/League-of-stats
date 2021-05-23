import React from 'react';

import {checkBigNum} from '../../../../components/manipulationsWithNums/checkNums';

const TotalTeamScore = ({leftTeam, rightTeam, type}) => {
	const calcScore = (team) => {
		const result = team.reduce((acc, el) => {return acc += el[type].total}, 0);
		return checkBigNum(result);
	}

	const leftTeamScore = calcScore(leftTeam);
	const rightTeamScore = calcScore(rightTeam);

	return(
		<div className="total_team_score">
			<div className="left_team team">Команда: {leftTeamScore}</div>
			<div className="right_team team">Команда: {rightTeamScore}</div>
		</div>
	)
}

export default TotalTeamScore;