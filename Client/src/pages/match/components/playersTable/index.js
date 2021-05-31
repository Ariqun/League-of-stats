import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {modifyChampName} from '../../../../components/manipulationsWithStr/modifyChampName';

import './index.sass';

const PlayersTable = ({currentPlayer, participants, region, version}) => {
	const leftTeam = [];
	const rightTeam = [];

	for (let player of participants) {
		const obj = {
			name: player.summonerName,
			champ: player.championName
		}

		if (player.teamId === 100) {
			leftTeam.push(obj)
		} else if(player.teamId === 200) {
			rightTeam.push(obj);
		}
	}

	const createDOM = (player) => {
		const champName = modifyChampName(player.champ);

		return(
			<div className={currentPlayer === player.name ? 'current_player' : 'player_small'} data-tip={player.name} data-for="tooltip" key={player.name}>
				<Link to={`/summoner/${region}/${player.name}`}>
					<div className="champion_icon">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} alt={`${champName}_icon`}/>
					</div>
					<div className="player_name">
						<span>{player.name}</span>
					</div>
				</Link>	
			</div>
		)
	}

	return(
		<div className="players_block">
			<div className="left_team">
				{leftTeam.map(player => {return createDOM(player)})}
			</div>
			<div className="right_team">
				{rightTeam.map(player => {return createDOM(player)})}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(PlayersTable);