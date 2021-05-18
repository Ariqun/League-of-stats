import React, {useEffect, useState} from 'react';

import ItemsBlock from './ItemsBlock';
import {LoadingBlock} from '../../../../components/loading';

import DataBase from '../../../../services/dataBase';

import './index.sass';

const Builds = ({champ}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champStats, setChampStats] = useState({});
	const db = new DataBase();

	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getChampionStats(champ.key);
			
			setChampStats(res);
			changeLoading(false);
		}
		getInfo();
	}, [])

	if (isLoading) return <LoadingBlock />

	return(
		<div className="builds">
			<ItemsBlock champStats={champStats}/>
			
		</div>
	)
}

export default Builds;