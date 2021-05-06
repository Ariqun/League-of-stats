import React, {useState, useEffect} from 'react';

import Loading from '../../../../components/loading';
import CircleCanvas from '../../../../components/сanvases/circleCanvas';

import DataBase from '../../../../services/dataBase';

import './index.sass';
import MatchTypes from './matchTypes';
import StatNumbers from './statNumbers';

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

	if (isLoading) return <Loading />

	console.log(statistics)

	return(
		<div className="statistics">
			<MatchTypes stats={statistics.stats}/>

			<StatNumbers stats={statistics.champs}/>
		</div>
	)
}

export default Statistics;