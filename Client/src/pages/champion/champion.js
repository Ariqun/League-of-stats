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

	const dd = new DragonData(version);

	useEffect(() => {
		const getChampion = async () => {
			const res = await dd.getChampion(champName);
			
			setChamp(res);
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