import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import DragonData from '../../services/dragonData';

import './mainPage.sass';

function MainPage({version}) {
	const [champions, setChampions] = useState({});
	const [champNames, setChampNames] = useState([]);
	const [shownRoles, changeShownRoles] = useState(['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank']);

	const dragonData = new DragonData();
	const language = 'ru_RU';

	useEffect(() => {
		const getInfo = async () => {
			const res = await dragonData.getAllChampions(`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);

			setChampions({...res});
			setChampNames([...Object.keys({...res})]);
		}
		getInfo();
	}, [])

	const createChampionsBlock = () => {
		const champs = champNames.map(item => {
			const {key, name, tags} = champions[item];
			let show = false;

			for (let elem of tags) {
				if (shownRoles.includes(elem)) show = true;
			}

			if (!show) return null;

			return (
				<div className="champion" key={key} roles={tags}>
					<Link to={`/champion/${item}`}>
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item}.png`} 
							 alt={name} 
							 title={name}>
						</img>
					</Link>
				</div>
			)
		})

		return champs;
	}

	const createRolesBlock = () => {
		const arrOfRoles = ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];

		const roles = arrOfRoles.map(role => {
			const opacity = shownRoles.includes(role);

			return(
				<div onClick={() => toggleVision(role)} className={opacity ? 'role' : 'role inactive'} key={role}>
					<img src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`} 
					  	 alt={`Role_${role}`} 
					 	 title={role}>
					</img>
				</div>
			)
		})

		return roles;
	}

	const toggleVision = (role) => {
		if (shownRoles.includes(role)) {
			const arr = shownRoles.filter(item => item !== role);
			changeShownRoles([...arr]);
		} else {
			changeShownRoles([...shownRoles, role]);
		}
	}

	const render = () => {
		return(
			<div className="main_page">
				<div className="container">
					<div className="roles col-6 offset-3">
						{createRolesBlock()}
					</div>

					<div className="champions col-12">
						{createChampionsBlock()}
					</div>
				</div>
			</div>
		)
	}

	return render();
}

export default MainPage;