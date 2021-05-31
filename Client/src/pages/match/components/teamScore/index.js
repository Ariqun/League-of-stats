import React from 'react';

import MatchResult from '../matchResult';

import './index.sass';

const TeamScore = ({teamId, info}) => {
	const {teams, participants, gameDuration} = info;

	const teamStats = teams.find(team => team.teamId === teamId);
	const {objectives} = teamStats;
	const players = [];
	let isSurrender = '';

	for (let player of participants) {
		if (player.teamId === teamId) {
			const {win, gameEndedInEarlySurrender, gameEndedInSurrender} = player;
			
			isSurrender = !win && (gameEndedInEarlySurrender || gameEndedInSurrender);

			players.push(player);
		};
	}

	const kills = players.reduce((acc, el) => {return acc += el.kills}, 0);
	const deaths = players.reduce((acc, el) => {return acc += el.deaths}, 0);
	const assists = players.reduce((acc, el) => {return acc += el.assists}, 0);

	return(
		<div className={teamId === 100 ? "left_team col-4" : "right_team col-4"}>
			<div className="result">
				<MatchResult teams={teams} teamId={teamId} duration={gameDuration} surrender={isSurrender}/>
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