import React, {useState, useEffect} from 'react';

import MatchItem from './matchItem';

import RiotAPI from '../services/riotAPI';

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
		if (i >= 1) {
			return null;
		}

		return <MatchItem matchID={match} name={name} version={version} key={match}/>
	});

	return(
		<div className="matches">
			{matchList}
		</div>
	)
}

export default SummonerMatches;