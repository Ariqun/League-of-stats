import React from 'react';
import {connect} from 'react-redux';
import TeamBlock from './components/teamBlock';

const LiveMatch = ({live}) => {
	const leftTeam = live.participants.filter(player => player.teamId === 100);
	const rightTeam = live.participants.filter(player => player.teamId === 200);

	return(
		<div className="live_page">
			<div className="container">
				<TeamBlock team={leftTeam} type="left"/>

				<TeamBlock team={rightTeam} type="right"/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {live: state.live};
}

export default connect(mapStateToProps)(LiveMatch);