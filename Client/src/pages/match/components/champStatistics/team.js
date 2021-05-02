import React from 'react';

const Team = ({team, version}) => {
	const content = team.players.map((player, i) => {
		const {championName} = player;

		return (
			<div className="tab" key={`${championName}_${i}`}>
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} 
					 alt={`${championName}_icon`}
				/>
			</div>
		);
	});

	return content;
}

export default Team;