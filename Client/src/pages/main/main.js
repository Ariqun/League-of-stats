import React, {useState, useEffect} from 'react';

import ChampionBlock from './components/championBlock';
import Roles from './components/roles';

import DragonData from '../../services/dragonData';

const Main = ({version}) => {
	const [champions, setChampions] = useState({});
	const [champNames, setChampNames] = useState([]);
	const [shownRoles, changeShownRoles] = useState(['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank']);
	const [inputValue, setInputValue] = useState('');

	const dragonData = new DragonData();
	const language = 'ru_RU';

	useEffect(() => {
		const getInfo = async () => {
			const res = await dragonData.getAllChampions(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
			
			setChampions(res);
			setChampNames([...Object.keys({...res})]);
		}
		getInfo();
	}, [])

	const toggleVision = (role) => {
		if (shownRoles.includes(role)) {
			const arr = shownRoles.filter(item => item !== role);
			changeShownRoles([...arr]);
		} else {
			changeShownRoles([...shownRoles, role]);
		}
	}

	const showChamp = (e) => {
		setInputValue(e.target.value);
	}

	return(
		<div className="main_page">
			<div className="container">
				<Roles shownRoles={shownRoles} toggleVision={toggleVision}/>

				<div className="choice_champ col-12">
					<input onChange={showChamp} className="col-3" type="text" placeholder="Начните вводить имя чемпиона..."></input>
				</div>

				<ChampionBlock champNames={champNames} champions={champions} inputValue={inputValue} shownRoles={shownRoles} version={version}/>
			</div>
		</div>
	)
}

export default Main;