import React from 'react';

const Tabs = ({leftTeam, rightTeam, changeTab, version}) => {
	const createTeamBlock = (team) => {
		const content = team.players.map((player, i) => {
			const {championName, participantId} = player;
	
			return (
				<div onClick={() => changeTab(participantId)} className="tab" key={`${championName}_${i}`}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} 
						 alt={`${championName}_icon`}
					/>
				</div>
			);
		});
	
		return content;
	}

	return(
		<div className="tabs">
			<div className="left_team">
				{createTeamBlock(leftTeam)}
			</div>

			<div className="table">
				
			</div>

			<div className="right_team">
				{createTeamBlock(rightTeam)}
			</div>
		</div>
	)
}

export default Tabs;