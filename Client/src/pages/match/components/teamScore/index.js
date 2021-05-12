import React from 'react';

const TeamScore = ({teamId, info}) => {
	const {teams, participants} = info;

	const teamStats = teams.find(team => team.teamId === teamId);
	const {win, objectives} = teamStats;
	const players = [];

	for (let player of participants) {
		if (player.teamId === teamId) players.push(player);
	}

	const kills = players.reduce((acc, el) => {return acc += el.kills}, 0);
	const deaths = players.reduce((acc, el) => {return acc += el.deaths}, 0);
	const assists = players.reduce((acc, el) => {return acc += el.assists}, 0);

	return(
		<div className={teamId === 100 ? "left_team col-4" : "right_team col-4"}>
			<div className="result">
				<div className={win ? 'win' : 'defeat'}>{win ? 'Победа' : 'Поражение'}</div>
				<div className="score">
					<span>{kills}</span>
					<span> / </span>
					<span>{deaths}</span>
					<span> / </span>
					<span>{assists}</span>
				</div>
			</div>

			<div className="objects">
				{Object.keys(objectives).map(obj => {
					if (obj === 'champion') return null;

					return(
						<div className={`object ${obj}`} key={obj}>
							<div className="obj_icon"></div>
							<span className="amount">{objectives[obj].kills}</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default TeamScore;