import React, {useState} from 'react';

import Tabs from './tabs';
import SkillsBlock from './skillsBlock';

import './index.sass';
import RunesBlock from './runesBlock';
import ItemsBlock from './itemsBlock';

const ChampStatistics = ({info, version}) => {
	const [tab, setTab] = useState(8);
	const {leftTeam, rightTeam} = info;

	const changeTab = (id) => {
		setTab(id);
	}

	return(
		<div className="champion_statistic">
			<Tabs changeTab={changeTab} leftTeam={leftTeam} rightTeam={rightTeam} version={version}/>

			<div className="content">
				<SkillsBlock info={info} tab={tab} version={version}/>
				<RunesBlock info={info} tab={tab} version={version}/>
				<ItemsBlock info={info} tab={tab} version={version}/>
			</div>
		</div>
	)
}

export default ChampStatistics;