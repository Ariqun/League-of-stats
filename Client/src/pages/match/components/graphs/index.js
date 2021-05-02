import React from 'react';

import CanvasGraph from '../canvasGraph';
import infoForCanvas from '../infoForCanvas';

const Graphs = ({info, version}) => {
	const leftTeamInfoForCanvas = infoForCanvas(info.leftTeam.players, version);
	const rightTeamInfoForCanvas = infoForCanvas(info.rightTeam.players, version);

	return(
		<div className="graphs">
			<div className="graph graph_damage">
				<span className="graph_title">Урон по чемпионам</span>
				<CanvasGraph leftTeam={leftTeamInfoForCanvas} rightTeam={rightTeamInfoForCanvas} option="dmg"/>
			</div>

			<div className="graph graph_heal">
				<span className="graph_title">Лечение и щиты на союзников</span>
				<CanvasGraph leftTeam={leftTeamInfoForCanvas} rightTeam={rightTeamInfoForCanvas} option="heal"/>
			</div>
		</div>
	)
}

export default Graphs;