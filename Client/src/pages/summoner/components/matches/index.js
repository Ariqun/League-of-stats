import React, {useState} from 'react';

import MatchItem from './matchItem';

import './index.sass';

const Matches = ({matchIds, name}) => {
	const [matchListLenght, changeMatchListLength] = useState(10);

	const matchList = matchIds.map((match, i) => {
		if (i >= matchListLenght) return null;

		return <MatchItem matchId={match} name={name} key={match}/>
	});
	
	return(
		<div className="summoner_matches">
			{matchList}

			<button onClick={() => changeMatchListLength(matchListLenght + 10)} className="show_more_matches">Показать еще 10 матчей</button>
		</div>
	)
}

export default Matches;