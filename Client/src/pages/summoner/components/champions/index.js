import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';

import Tabs from './tabs';
import TableHead from './tableHead';
import TableBody from './tableBody';
import StatisticsNotFound from '../../../../components/errors/statisticsNotFound';

import './index.sass';

const Champions = ({statistics, matchAmount}) => {
	const [tab, changeTab] = useState('total');
	const [sortBy, changeSortBy] = useState('matches');

	if (!statistics) return <StatisticsNotFound matchAmount={matchAmount}/>
	
	return(
		<div className="champs">
			<div className="champs_wrapper">
				<Tabs changeTab={changeTab} currentTab={tab}/>

				<table>
					<tbody>
						<TableHead changeSort={changeSortBy} sortBy={sortBy}/>

						<TableBody tab={tab} statistics={statistics} sortBy={sortBy}/>
					</tbody>
				</table>
			</div>

			<ReactTooltip id="tooltip" html/>
		</div>
	)
}

export default Champions;