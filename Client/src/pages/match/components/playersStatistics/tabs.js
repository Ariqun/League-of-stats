import React from 'react';
import {connect} from 'react-redux';

import {modifyChampName} from '../../../../components/manipulationsWithStr/modifyChampName';

const Tabs = ({tab, participants, changeTab, version}) => {
	const leftPlayers = [], rightPlayers = [];

	for (let player of participants) {
		if (player.teamId === 100) leftPlayers.push(player);
		if (player.teamId === 200) rightPlayers.push(player);
	}

	const createTeamBlock = (players) => {
		const content = players.map((player, i) => {
			const {championName, participantId} = player;
			const champName = modifyChampName(championName);
	
			return (
				<div onClick={() => changeTab(participantId)} className={tab === participantId ? "tab active" : "tab"} key={`${champName}_${i}`}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} 
						 alt={`${champName}_icon`}
					/>
				</div>
			);
		});
	
		return content;
	}

	return(
		<div className="tabs">
			<div className="left_team">
				{createTeamBlock(leftPlayers)}
			</div>

			<div onClick={() => changeTab('table')} className="table">
				<img src={`${process.env.PUBLIC_URL}/assets/icons/table.png`} alt="table_icon"/>
			</div>

			<div className="right_team">
				{createTeamBlock(rightPlayers)}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Tabs);