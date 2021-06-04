import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Nav from '../../components/nav';
import General from './components/general';
import Skills from './components/skills';
import Skins from './components/skins';
import Statistics from './components/statistics';
import Builds from './components/builds';
import langForDB from '../../components/languages/langForDB';
import {LoadingPage} from '../../components/loading';

import DragonData from '../../services/dragonData';

const Champion = ({champName, lang, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champ, setChamp] = useState({});
	const [tab, changeTab] = useState('general');
	
	const dd = new DragonData(version, langForDB(lang));

	useEffect(() => {
		const getChampion = async () => {
			const res = await dd.getChampion(champName);
			
			setChamp(res);
			changeLoading(false);
		}
		getChampion();
	}, []);

	if (isLoading) return <LoadingPage />

	const titles = ['general', 'skills','skins', 'builds', 'statistics'];

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

	return (
		<div className="champion_page">
			<div className="container">
				<Nav changeTab={changeTab} titles={titles}/>
				{content()}
			</div>
		</div>
	)
};

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Champion);