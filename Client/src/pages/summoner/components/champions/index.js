import React, {useState, useEffect} from 'react';

import Tabs from './tabs';
import TableHead from './tableHead';
import TableBody from './tableBody';
import {LoadingBlock} from '../../../../components/loading';

import DataBase from '../../../../services/dataBase';

import './index.sass';

const Champions = ({sumID}) => {
	const [isLoading, changeLoading] = useState(true);
	const [statistics, setStatistics] = useState([]);
	const [tab, changeTab] = useState('total');
	const [sortBy, changeSortBy] = useState('matches');
	const db = new DataBase();

	useEffect(() => {
		const getChamps = async () => {
			const res = await db.getSumStatistics(sumID);
			setStatistics(res);
			changeLoading(false);
		}
		getChamps();
	}, [])

	if (isLoading) return <LoadingBlock />

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