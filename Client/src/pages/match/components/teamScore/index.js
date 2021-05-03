import React from 'react';

const TeamScore = ({info, id}) => {
	let team = {};

	for (let elem in info) {
		if (typeof info[elem] === 'object' && info[elem].teamstats.teamId === id) {
			team = info[elem].teamstats;
		}
	}

	const {win, kills, deaths, assists, objectives} = team;

	return(
		<>
			<div className="result">
				<div className={win ? 'win' : 'defeat'}>{win ? 'Победа' : 'Поражение'}</div>
				<div className="score">
					<span className="kills">{kills}</span>
					<span> / </span>
					<span className="deaths">{deaths}</span>
					<span> / </span>
					<span className="assists">{assists}</span>
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
		</>
	)
}

export default TeamScore;