import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import Tabs from './tabs';
import Table from './table';
import SkillsBlock from './skillsBlock';
import RunesBlock from './runesBlock';
import ItemsBlock from './itemsBlock';

import './index.sass';

const PlayersStatistics = ({info}) => {
	const [tab, setTab] = useState(1);
	const {participants} = info;

	useEffect(() => {
		ReactTooltip.rebuild();
	}, [tab])

	const changeTab = (id) => setTab(id);

	const content = () => {
		if (tab !== 'table') {
			return(
				<>
					<SkillsBlock info={info} tab={tab} />
					<RunesBlock info={info} tab={tab} />
					<ItemsBlock info={info} tab={tab} />
				</>
			)
		}
		return <Table info={info} />
	}

	return(
		<div className="champion_statistic">
			<Tabs tab={tab} changeTab={changeTab} participants={participants} />

			<div className="content">
				{content()}
			</div>
		</div>
	)
}

export default PlayersStatistics;