import React, {useEffect, useState} from 'react';

import MainStats from './mainStats';
import Positions from './positions';
import Average from './average';
import {LoadingBlock} from '../../../../components/loading';

import DataBase from '../../../../services/dataBase';

import './index.sass';

const Statistics = ({champ}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champStats, setChampStats] = useState({});

	const {roles, matches} = champStats;
	const db = new DataBase();
	
	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getChampionStats(champ.key);
			setChampStats(res);
			changeLoading(false);
		}
		getInfo();
	}, []);

	if (isLoading) return <LoadingBlock />
	
	return (
		<div className="stats">
			<MainStats champStats={champStats}/>

			<div className="posAndAvg">
				<Positions roles={roles} matches={matches}/>
				<Average champStats={champStats}/>
			</div>
		</div>
	);
}

export default Statistics;