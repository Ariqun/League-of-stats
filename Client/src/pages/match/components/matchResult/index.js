import React from 'react';

const MatchResult = ({teams, teamId, duration}) => {
	if (duration < 300000) return <div className="remake">Пересоздано</div>

	for (let team of teams) {
		if (team.teamId === teamId) {
			return(
				<div className={team.win ? 'win' : 'defeat'}>{team.win ? 'Победа' : 'Поражение'}</div>
			);
		}
	}
}

export default MatchResult;