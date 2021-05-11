import React, {useState, useEffect} from 'react';

import MatchItem from './matchItem';

import RiotAPI from '../../../../services/riotAPI';

import './index.sass';

const Matches = ({puuID, name}) => {
	const [matches, setMatches] = useState([]);
	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getAllMatches = async () => {
			const res = await riotAPI.getSumMatches(puuID);
			setMatches(res);
		}
		getAllMatches();
	}, []);
	
	const matchList = matches.map((match, i) => {
		if (i >= 5) {
			return null;
		}

		return <MatchItem matchId={match} name={name} key={match}/>
	});

	return(
		<div className="summoner_matches">
			{matchList}
		</div>
	)
}

export default Matches;