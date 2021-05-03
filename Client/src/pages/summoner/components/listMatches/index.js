import React, {useState, useEffect} from 'react';

import MatchItem from '../matchItem';

import RiotAPI from '../../../../services/riotAPI';

const ListMatches = ({puuID, name, version}) => {
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

		return <MatchItem matchId={match} name={name} version={version} key={match}/>
	});

	return(
		<div className="matches">
			{matchList}
		</div>
	)
}

export default ListMatches;