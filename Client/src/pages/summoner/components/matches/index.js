import React, {useState} from 'react';

import MatchItem from './matchItem';
import SkyblueBtn from '../../../../components/buttons/skyblueBtn';

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

			<div onClick={() => changeMatchListLength(matchListLenght + 10)} className="show_more_matches">
				<SkyblueBtn text="Показать еще 10 матчей" />
			</div>
		</div>
	)
}

export default Matches;