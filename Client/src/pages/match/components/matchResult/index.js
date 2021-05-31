import React from 'react';

import './index.sass';

const MatchResult = ({teams, teamId, duration, surrender}) => {
	if (duration < 300000) return <div className="remake">Пересоздано</div>

	for (let team of teams) {
		if (team.teamId === teamId) {
			return(
				<div className={team.win ? 'win' : 'defeat'}>
					{team.win ? 'Победа' : 'Поражение'}
					<span className="surrender"> {surrender ? '(сдались)' : ''}</span>
				</div>
			);
		}
	}
}

export default MatchResult;