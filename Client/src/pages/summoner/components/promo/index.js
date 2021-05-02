import React from 'react';

import Rating from './rating';
import Banner from './banner';
import CircleCanvas from './circleCanvas';

import './index.sass';

const Promo = ({summoner, version}) => {
	const {name, lvl, iconID, ranked} = summoner;

	return (
		<div className="promo">
			<Rating ranked={ranked}/>
			<Banner name={name} lvl={lvl} iconID={iconID} version={version}/>
			<CircleCanvas ranked={ranked}/>
		</div>
	)
}

export default Promo;