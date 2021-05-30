import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Nav from '../../components/nav';
import General from './components/general';
import Skills from './components/skills';
import Skins from './components/skins';
import Statistics from './components/statistics';
import Builds from './components/builds';
import checkLanguage from '../../components/languages/checkLanguage';
import {LoadingPage} from '../../components/loading';

import DragonData from '../../services/dragonData';


const Champion = ({champName, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champ, setChamp] = useState({});
	const [tab, changeTab] = useState('general');
	
	const lang = checkLanguage();
	const dd = new DragonData(version, lang);

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
		
		if (tab === 'general') tabContent = <General champ={champ} id={id}/>;
		if (tab === 'skills') tabContent = <Skills champ={champ}/>;
		if (tab === 'skins') tabContent = <Skins champ={champ}/>;
		if (tab === 'builds') tabContent = <Builds champ={champ}/>;
		if (tab === 'statistics') tabContent = <Statistics champ={champ}/>;

		return tabContent;
	}

	if (isLoading) return <LoadingPage />

	const titles = ['general', 'skills','skins', 'builds', 'statistics'];

	return (
		<div className="champion_page">
			<div className="container">
				<Nav changeTab={changeTab} type="champNav" titles={titles}/>
				{content()}
			</div>
		</div>
	)
};

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Champion);