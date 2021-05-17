import React from 'react';

import Rating from './rating';
import Banner from './banner';
import CircleCanvas from '../../../../components/сanvases/circleCanvas';
import CheckLiveMatch from './checkLiveMatch';

import './index.sass';

const Promo = ({summoner}) => {
	const {name, lvl, iconID, ranked, region} = summoner;
	const sumId = summoner.tech.sumID;
	let wins = 0, losses = 0;
	
	if (ranked) {
		wins = ranked.wins;
		losses = ranked.losses;
	}

	return (
		<div className="promo">
			<Rating ranked={ranked}/>
			<Banner name={name} lvl={lvl} iconID={iconID}/>
			<CircleCanvas primary={wins} secondary={losses} width="200" height="200"/>
			<CheckLiveMatch name={name} sumId={sumId} region={region}/>
		</div>
	)
}

export default Promo;