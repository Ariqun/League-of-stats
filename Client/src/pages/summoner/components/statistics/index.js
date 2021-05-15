import React, {useState, useEffect} from 'react';

import {LoadingBlock} from '../../../../components/loading';
import MatchTypes from './matchTypes';
import StatNumbers from './statNumbers';

import DataBase from '../../../../services/dataBase';

import './index.sass';

const Statistics = ({sumID}) => {
	const [isLoading, changeLoading] = useState(true);
	const [statistics, setStatistics] = useState({});
	const db = new DataBase();

	useEffect(() => {
		const getChamps = async () => {
			const res = await db.getSumStatistics(sumID);
			setStatistics({stats: res.statistics[0], champs: res.champions[0]});
			changeLoading(false);
		}
		getChamps();
	}, [])

	if (isLoading) return <LoadingBlock />

	return(
		<div className="statistics">
			<MatchTypes stats={statistics.stats}/>

			<StatNumbers stats={statistics.champs}/>
		</div>
	)
}

export default Statistics;