import React from 'react';
import {Link} from 'react-router-dom';

const ChampionBlock = ({champNames, champions, inputValue, shownRoles, version}) => {
	const champs = champNames.map(item => {
		const {key, name, tags} = champions[item];
		const lowerName = name.toLowerCase();
		const lowerValue = inputValue.toLowerCase();
		let show = false;

		for (let elem of tags) {
			if (shownRoles.includes(elem) && lowerName.includes(lowerValue)) show = true;
		}

		if (!show) return null;

		return (
			<div className="champion" name={name} roles={tags} key={key}>
				<Link to={`/champion/${item}`}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item}.png`} 
						 alt={name} 
						 title={name}>
					</img>
				</Link>
			</div>
		)
	});

	return (
		<div className="champions col-12">
			{champs}
		</div>
	);
}

export default ChampionBlock;