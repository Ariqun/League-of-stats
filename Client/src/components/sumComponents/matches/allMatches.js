import React, {useState, useEffect} from 'react';
import RiotAPI from '../../services/riotAPI';

import MatchItem from './matchItem';


function SummonerMatches({puuID, name, version}) {
	const [matches, setMatches] = useState([]);
	
	const riotAPI = new RiotAPI();

	useEffect(() => {
		getAllMatches();
	}, []);

	const getAllMatches = () => {
		riotAPI.getSumMatches(puuID)
			.then(res => setMatches(res));
	}

	const matchList = matches.map((match, i) => {
		if (i >= 5) {
			return null;
		}

		return <MatchItem matchId={match} name={name} version={version} key={match}/>
	});

	return(
		<div className="matches">
			{matchList}
		</div>
	)
}

export default SummonerMatches;