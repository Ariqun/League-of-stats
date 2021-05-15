import React, {useState, useEffect} from 'react';

import Card from './card';
import {LoadingBlock} from '../../../../components/loading';

import DataBase from '../../../../services/dataBase';

import './index.sass';

const Records = ({sumID}) => {
	const [isLoading, changeLoading] = useState(true);
	const [records, setRecords] = useState([]);
	const db = new DataBase();

	useEffect(() => {
		const getChamps = async () => {
			const res = await db.getSumStatistics(sumID);
			
			setRecords(res.records[0]);
			changeLoading(false);
		}
		getChamps();
	}, [])

	if (isLoading) return <LoadingBlock />

	const {kda, kills, deaths, assists, cs, gold, dmg, heal, dmgTaken, CC, vision, wards, killingSpree, double, triple, quadra, penta} = records;
	const basics = {kills, deaths, assists, kda, cs, gold};
	const impact = {dmg, heal, dmgTaken, CC, vision, wards};
	const combo = {killingSpree, double, triple, quadra, penta};

	return(
		<div className="records">
			<div className="records_wrapper">
				<div className="block basics">
					<Card records={basics}/>
				</div>

				<div className="block impact">
					<Card records={impact}/>
				</div>

				<div className="block combo">
					<Card records={combo}/>
				</div>
			</div>
		</div>
	)
}

export default Records;