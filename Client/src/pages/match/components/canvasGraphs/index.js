import React from 'react';
import {connect} from 'react-redux';

import Canvas from '../canvas';
import canvasInfo from '../canvasInfo';

import './index.sass';

const CanvasGraphs = ({info, version}) => {
	const {participants} = info;

	const leftTeamCanvasInfo = canvasInfo(100, participants, version);
	const rightTeamCanvasInfo = canvasInfo(200, participants, version);

	return(
		<div className="graphs">
			<div className="graph graph_damage">
				<span className="graph_title">Урон по чемпионам</span>
				<Canvas leftTeam={leftTeamCanvasInfo} rightTeam={rightTeamCanvasInfo} option="dmg"/>
			</div>

			<div className="graph graph_heal">
				<span className="graph_title">Лечение и щиты на союзников</span>
				<Canvas leftTeam={leftTeamCanvasInfo} rightTeam={rightTeamCanvasInfo} option="heal"/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(CanvasGraphs);