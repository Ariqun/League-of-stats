import React, {useState, useEffect} from 'react';

import Promo from './components/promo';
import Nav from './components/nav';
import ListMatches from './components/listMatches';
import Champions from './components/champions';
import Loading from '../../components/loading';

import RiotAPI from '../../services/riotAPI';

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

		if (tab === 'matches') {
			tabContent = <ListMatches puuID={puuID} name={summoner.name} version={version}/>;
		} else if (tab === 'champs') {
			tabContent = <Champions sumID={sumID} version={version}/>;
		}

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