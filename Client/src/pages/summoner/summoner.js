import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from '../../components/nav';
import Matches from './components/matches';
import Champions from './components/champions';
import Records from './components/records';
import Statistics from './components/statistics';
import {LoadingPage} from '../../components/loading';

import RiotAPI from '../../services/riotAPI';
import DataBase from '../../services/dataBase';

const Summoner = ({region, name}) => {
	const [isloading, changeLoading] = useState(true);
	const [summoner, setSummoner] = useState({});
	const [statistics, setStatistics] = useState({});
	const [tab, changeTab] = useState('matches');
	const riotAPI = new RiotAPI();
	const db = new DataBase();
	window.scrollTo(0, 0);
	
	useEffect(() => {
		const getSummoner = async () => {
			console.time('hey');
			const sumInfo = await riotAPI.getSummoner(region, name);

			const sumStats = await db.getSumStatistics(sumInfo.puuid);
			console.timeEnd('hey');

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
		const matchAmount = matchIds.length;
		
		if (tab === 'matches') return <Matches matchIds={matchIds} name={name} region={region}/>;
		if (tab === 'champs') return <Champions statistics={statistics} matchAmount={matchAmount}/>
		if (tab === 'records') return <Records records={records} matchAmount={matchAmount}/>
		if (tab === 'statistics') return <Statistics statistics={statistics} matchAmount={matchAmount}/>
	}

	const titles = ['matches', 'champs', 'records', 'statistics'];

	return (
		<div className="summoner_page">
			<div className="container">
				<Promo summoner={summoner} statistics={statistics}/>
				<Nav changeTab={changeTab} type="sumNav" titles={titles}/>

				{content()}
			</div>
		</div>
	)
	
}

export default Summoner;