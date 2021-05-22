import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from './components/nav';
import Matches from './components/matches';
import Champions from './components/champions';
import Records from './components/records';
import {LoadingPage} from '../../components/loading';

import RiotAPI from '../../services/riotAPI';
import Statistics from './components/statistics';

const Summoner = ({region, name}) => {
	const [isloading, changeLoading] = useState(true);
	const [summoner, setSummoner] = useState({});
	const [tab, changeTab] = useState('matches');
	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getSummoner = async () => {
			const res = await riotAPI.getSummoner(region, name);

			setSummoner(res);
			changeLoading(false);
		}
		getSummoner();
		
		return () => {changeLoading(true)}
	}, [name])

	if (isloading) return <LoadingPage />

	const content = () => {
		const {puuID, sumID} = summoner.tech;

		if (tab === 'matches') return <Matches puuID={puuID} name={summoner.name} />;
		if (tab === 'champs') return <Champions sumID={sumID} />;
		if (tab === 'records') return <Records sumID={sumID} />
		if (tab === 'stats') return <Statistics sumID={sumID} /> 
	}

	return (
		<div className="summoner_page">
			<div className="container">
				<Promo summoner={summoner}/>
				<Nav changeTab={changeTab}/>

				{content()}
			</div>
		</div>
	)
}

export default Summoner;