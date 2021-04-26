import React, {useState, useEffect} from 'react';

import SummonerPromo from '../../sumComponents/sumPromo';
import SummonerNav from '../../sumComponents/sumNav';
import ListMatches from '../../matchComponents/listMatches';
import Loading from '../../loading/loading';

import RiotAPI from '../../services/riotAPI';

import './summonerPage.sass';

function SummonerPage({version, region, name}) {
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

	const selectTab = (id) => {
		changeTab(id);
	}

	const getContent = () => {
		const {puuID} = summoner.tech;
		let tabContent = "";

		if (tab === 'matches') {
			tabContent = <ListMatches puuID={puuID} name={summoner.name} version={version}/>;
		}

		return tabContent;
	}

	const render = () => {
		if (loading) return <Loading/>;

		return (
			<div className="summoner_page">
				<div className="container">
					<SummonerPromo summoner={summoner} version={version}/>
					<SummonerNav changeTab={selectTab}/>
	
					{getContent()}
				</div>
			</div>
		)
	}

	return render();
}

export default SummonerPage;