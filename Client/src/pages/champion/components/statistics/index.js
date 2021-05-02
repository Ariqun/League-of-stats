import React, {useEffect, useState} from 'react';

import MainStats from './mainStats';
import Positions from './positions';
import Average from './average';
import Loading from '../../../../components/loading';

import DataBase from '../../../../services/dataBase';

import './index.sass';

const Statistics = ({champ}) => {
	const [champStats, setChampStats] = useState({});
	const [loading, changeLoading] = useState(true);
	const db = new DataBase();

	const {roles, matches} = champStats;

	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getChampionStats(champ.key);
			setChampStats(res);
			changeLoading(false);
		}
		getInfo();
	}, []);

	if (loading) return <Loading/>;
	
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