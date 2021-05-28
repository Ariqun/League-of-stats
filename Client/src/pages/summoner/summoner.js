import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from './components/nav';
import Matches from './components/matches';
import Champions from './components/champions';
import Records from './components/records';
import {LoadingPage} from '../../components/loading';

import RiotAPI from '../../services/riotAPI';
import Statistics from './components/statistics';
import DataBase from '../../services/dataBase';

const Summoner = ({region, name}) => {
	const [isloading, changeLoading] = useState(true);
	const [summoner, setSummoner] = useState({});
	const [statistics, setStatistics] = useState({});
	const [tab, changeTab] = useState('matches');
	const riotAPI = new RiotAPI();
	const db = new DataBase();

	useEffect(() => {
		const getSummoner = async () => {
			console.time('hey');
			const sumInfo = await riotAPI.getSummoner(region, name);
			console.log(sumInfo);
			const sumStats = await db.getSumStatistics(sumInfo.sumId);
			console.log(sumStats);
			console.timeEnd('hey')
			setSummoner(sumInfo);
			setStatistics(sumStats);
			changeLoading(false);
		}
		getSummoner();
		
		return () => {changeLoading(true)}
	}, [name])

	if (isloading) return <LoadingPage />

	const content = () => {
		const {name, matchIds} = summoner;
		const {records} = statistics;

		if (tab === 'matches') return <Matches matchIds={matchIds} name={name}/>;
		if (tab === 'champs') return <Champions statistics={statistics} />
		if (tab === 'records') return <Records records={records} />
		if (tab === 'stats') return <Statistics statistics={statistics} />
	}

	return (
		<div className="summoner_page">
			<div className="container">
				<Promo summoner={summoner} statistics={statistics}/>
				<Nav changeTab={changeTab}/>

				{content()}
			</div>
		</div>
	)
	
}

export default Summoner;