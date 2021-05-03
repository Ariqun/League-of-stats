import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from './components/nav';
import ListMatches from './components/listMatches';
import Loading from '../../components/loading';

import RiotAPI from '../../services/riotAPI';

const Summoner = ({version, region, name}) => {
	const [loading, changeLoading] = useState(true);
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
		const {puuID} = summoner.tech;
		let tabContent = "";

		if (tab === 'matches') {
			tabContent = <ListMatches puuID={puuID} name={summoner.name} version={version}/>;
		}

		return tabContent;
	}

	if (loading) return <Loading/>;

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