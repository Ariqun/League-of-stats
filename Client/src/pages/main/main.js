import React, {useState} from 'react';

import ChampionBlock from './components/championBlock';
import Roles from './components/roles';

const Main = () => {
	const [shownRoles, changeShownRoles] = useState(['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank']);
	const [inputValue, setInputValue] = useState('');
	
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

				<ChampionBlock inputValue={inputValue} shownRoles={shownRoles}/>
			</div>
		</div>
	)
};

export default Main;