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
import ChampNotFound from '../../components/errors/champNotFound';

const Champion = ({champName, lang, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [isError, setError] = useState(false);
	const [champ, setChamp] = useState({});
	const [tab, changeTab] = useState('general');

	useEffect(() => {
		const getChampion = async () => {
			const dd = new DragonData(version, langForDB(lang));
			const res = await dd.getChampion(champName);
			
			if (res === 'Error') return setError(true);

			setChamp(res);
			changeLoading(false);
		}
		getChampion();
	}, [champName, lang, version]);

	if (isError) return <ChampNotFound name={champName}/>
	if (isLoading) return <LoadingPage />

	const titles = ['general', 'skills','skins', 'builds', 'statistics'];

	const content = () => {
		if (tab === 'general') return <General champ={champ} />;
		if (tab === 'skills') return <Skills champ={champ} />;
		if (tab === 'skins') return <Skins champ={champ} />;
		if (tab === 'builds') return <Builds champ={champ} />;
		if (tab === 'statistics') return <Statistics champ={champ} />;

		return null;
	}

	return (
		<div className="champion_page">
			<div className="container-xxl">
				<Nav changeTab={changeTab} titles={titles} tab={tab} />
				{content()}
			</div>
		</div>
	)
};

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Champion);