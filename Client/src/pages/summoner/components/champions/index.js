import React, {useState} from 'react';

import Tabs from './tabs';
import TableHead from './tableHead';
import TableBody from './tableBody';

import './index.sass';

const Champions = ({statistics}) => {
	const [tab, changeTab] = useState('total');
	const [sortBy, changeSortBy] = useState('matches');

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
		</div>
	)
}

export default Champions;