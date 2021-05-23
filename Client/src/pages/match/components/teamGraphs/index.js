import React from 'react';
import {connect} from 'react-redux';

import Canvas from './canvas';
import graphInfo from './graphInfo';

import './index.sass';
import TotalTeamScore from './totalTeamScore';

const TeamGraphs = ({info, version}) => {
	const {participants} = info;

	const leftTeamCanvasInfo = graphInfo(100, participants, version);
	const rightTeamCanvasInfo = graphInfo(200, participants, version);

	return(
		<div className="graphs">
			<div className="graph graph_damage">
				<span className="graph_title">Урон по чемпионам</span>
				<TotalTeamScore leftTeam={leftTeamCanvasInfo} rightTeam={rightTeamCanvasInfo} type="dmg"/>
				<Canvas leftTeam={leftTeamCanvasInfo} rightTeam={rightTeamCanvasInfo} option="dmg"/>
			</div>

			<div className="graph graph_heal">
				<span className="graph_title">Лечение и щиты на союзников</span>
				<TotalTeamScore leftTeam={leftTeamCanvasInfo} rightTeam={rightTeamCanvasInfo} type="heal"/>
				<Canvas leftTeam={leftTeamCanvasInfo} rightTeam={rightTeamCanvasInfo} option="heal"/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(TeamGraphs);