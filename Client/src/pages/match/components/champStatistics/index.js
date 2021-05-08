import React, {useState} from 'react';

import Tabs from './tabs';
import Table from './table';
import SkillsBlock from './skillsBlock';
import RunesBlock from './runesBlock';
import ItemsBlock from './itemsBlock';

import './index.sass';

const ChampStatistics = ({info, version}) => {
	const [tab, setTab] = useState(8);
	const {leftTeam, rightTeam} = info;

	const changeTab = (id) => {
		setTab(id);
	}

	const content = () => {
		if (tab !== 'table') {
			return(
				<>
					<SkillsBlock info={info} tab={tab} version={version}/>
					<RunesBlock info={info} tab={tab} version={version}/>
					<ItemsBlock info={info} tab={tab} version={version}/>
				</>
			)
		}
		return <Table info={info} version={version}/>
	}

	return(
		<div className="champion_statistic">
			<Tabs changeTab={changeTab} leftTeam={leftTeam} rightTeam={rightTeam} version={version}/>

			<div className="content">
				{content()}
			</div>
		</div>
	)
}

export default ChampStatistics;