import React from 'react';

import MatchItem from './matchItem';

import './index.sass';

const Matches = ({matchIds, name}) => {
	const matchList = matchIds.map((match, i) => {
		if (i >= 5) return null;

		return <MatchItem matchId={match} name={name} key={match}/>
	});

	return(
		<div className="summoner_matches">
			{matchList}
		</div>
	)
}

export default Matches;