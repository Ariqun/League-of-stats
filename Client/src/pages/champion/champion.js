import React, {useEffect, useState} from 'react';

import Nav from './components/nav';
import General from './components/general';
import Skills from './components/skills';
import Skins from './components/skins';
import Statistics from './components/statistics';
import Loading from '../../components/loading';

import DragonData from '../../services/dragonData';

const Champion = ({version, champName}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champ, setChamp] = useState({});
	const [tab, changeTab] = useState('general');

	const dragonData = new DragonData();

	useEffect(() => {
		const getChampion = async () => {
			const language = 'ru_RU';
	
			const res = await dragonData.getChampion(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${champName}.json`);

			setChamp(res[champName]);
			changeLoading(false);
		}
		getChampion();
	}, []);

	const content = () => {
		const {id} = champ;
		let tabContent = '';

		if (tab === 'general') {
			tabContent = <General champ={champ} id={id}/>;
		} else if (tab === 'skills') {
			tabContent = <Skills champ={champ} version={version}/>;
		} else if (tab === 'skins') {
			tabContent = <Skins champ={champ}/>;
		} else if (tab === 'statistics') {
			tabContent = <Statistics champ={champ}/>
		}

		return tabContent;
	}

	if (isLoading) return <Loading/>;

	return (
		<div className="champion_page">
			<div className="container">
				<Nav changeTab={changeTab}/>
				{content()}
			</div>
		</div>
	)

}

export default Champion;