import React from 'react';
import {connect} from 'react-redux';

import Canvas from './canvas';
import graphInfo from './graphInfo';

import './index.sass';
import TotalTeamScore from './totalTeamScore';

const TeamGraphs = ({info, version}) => {
	const {participants} = info;

	const leftTeamInfo = graphInfo(100, participants, version);
	const rightTeamInfo = graphInfo(200, participants, version);

	return(
		<div className="graphs">
			<div className="graph graph_damage">
				<span className="graph_title">Урон по чемпионам</span>
				<TotalTeamScore leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="dmg"/>
				<Canvas leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="dmg"/>
			</div>

			<div className="graph graph_heal">
				<span className="graph_title">Лечение и щиты на союзников</span>
				<TotalTeamScore leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="heal"/>
				<Canvas leftTeam={leftTeamInfo} rightTeam={rightTeamInfo} type="heal"/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(TeamGraphs);