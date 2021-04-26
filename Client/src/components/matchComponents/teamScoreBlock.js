import React from 'react';

function TeamScoreBlock({info, id}) {
	let team = {};

		for (let elem in info) {
			if (typeof info[elem] === 'object' && info[elem].teamstats.teamId === id) {
				team = info[elem].teamstats;
			}
		}

		return(
			<>
				<div className="result">
					<div className={team.win ? 'win' : 'defeat'}>{team.win ? 'Победа' : 'Поражение'}</div>
					<div className="score">
						<span className="kills">{team.kills}</span>
						<span> / </span>
						<span className="deaths">{team.deaths}</span>
						<span> / </span>
						<span className="assists">{team.assists}</span>
					</div>
				</div>

				<div className="objects">
					{Object.keys(team.objectives).map(obj => {
						if (obj === 'champion') return null;

						return(
							<div className={`object ${obj}`} key={obj}>
								<div className="obj_icon"></div>
								<span className="amount">{team.objectives[obj].kills}</span>
							</div>
						)
					})}
				</div>
			</>
		)
}

export default TeamScoreBlock;