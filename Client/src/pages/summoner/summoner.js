import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from '../../components/Navigation/Navigation';
import Matches from './components/matches';
import Champions from './components/champions';
import Records from './components/records';
import Statistics from './components/statistics';
import SummonerNotFound from '../../components/errors/summonerNotFound';
import {LoadingPage} from '../../components/loading';

import RiotAPI from '../../services/riotAPI';
import DataBase from '../../services/dataBase';

const Summoner = ({region, name}) => {
	const [isLoading, changeLoading] = useState(true);
	const [isError, setError] = useState(false);
	const [summoner, setSummoner] = useState({});
	const [statistics, setStatistics] = useState({});
	const [tab, changeTab] = useState('matches');
	window.scrollTo(0, 0);

	useEffect(() => {
		const getSummoner = async () => {
			const riotAPI = new RiotAPI();
			const db = new DataBase();

			const sumInfo = await riotAPI.getSummoner(region, name);
			
			if (sumInfo === 'Error') return setError(true);

			const sumStats = await db.getSumStatistics(sumInfo.sumId);

			setSummoner(sumInfo);
			setStatistics(sumStats);
			changeLoading(false);
		}
		getSummoner();
		
		return () => {
			changeLoading(true);
			changeTab('matches');
		}
	}, [region, name])

	if (isError) return <SummonerNotFound name={name} />
	if (isLoading) return <LoadingPage />
	
	const titles = ['matches', 'champs', 'records', 'statistics'];
	
	const content = () => {
		const {name, matchIds} = summoner;
		const {records} = statistics;
		const matchAmount = matchIds.length;
		
		if (tab === 'matches') return <Matches matchIds={matchIds} name={name} region={region} />;
		if (tab === 'champs') return <Champions statistics={statistics} matchAmount={matchAmount} />
		if (tab === 'records') return <Records records={records} matchAmount={matchAmount} />
		if (tab === 'statistics') return <Statistics statistics={statistics} matchAmount={matchAmount} />
	}

	return (
		<div className="summoner_page">
			<div className="container-xxl">
				<Promo summoner={summoner} statistics={statistics} />
				<Nav changeTab={changeTab} type="sumNav" titles={titles} tab={tab} />

				{content()}
			</div>
		</div>
	)
	
}

export default Summoner;