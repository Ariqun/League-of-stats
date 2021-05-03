import React from 'react';

import Canvas from '../canvas';
import canvasInfo from '../canvasInfo';

import './index.sass';

const CanvasGraphs = ({info, version}) => {
	const leftTeamCanvasInfo = canvasInfo(info.leftTeam.players, version);
	const rightTeamCanvasInfo = canvasInfo(info.rightTeam.players, version);

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

export default CanvasGraphs;