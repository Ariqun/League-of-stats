import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from './components/nav';
import Matches from './components/matches';
import Champions from './components/champions';
import Records from './components/records';
import Loading from '../../components/loading';

import RiotAPI from '../../services/riotAPI';
import Statistics from './components/statistics';

const Summoner = ({version, region, name}) => {
	const [isloading, changeLoading] = useState(true);
	const [summoner, setSummoner] = useState({});
	const [tab, changeTab] = useState('matches');

	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getSummoner = async () => {
			const res = await riotAPI.getSummoner(region, name);

			setSummoner({...res});
			changeLoading(false);
		}
		getSummoner();

	}, [])

	const content = () => {
		const {puuID, sumID} = summoner.tech;
		let tabContent = "";

		if (tab === 'matches') tabContent = <Matches puuID={puuID} name={summoner.name} version={version}/>;
		if (tab === 'champs') tabContent = <Champions sumID={sumID} version={version}/>;
		if (tab === 'records') tabContent = <Records sumID={sumID} version={version}/>
		if (tab === 'stats') tabContent = <Statistics sumID={sumID}/> 

		return tabContent;
	}

	if (isloading) return <Loading/>;

	return (
		<div className="summoner_page">
			<div className="container">
				<Promo summoner={summoner} version={version}/>
				<Nav changeTab={changeTab}/>

				{content()}
			</div>
		</div>
	)
}

export default Summoner;