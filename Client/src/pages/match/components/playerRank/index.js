import React, {useState, useEffect} from 'react';

import {ranks} from '../../../../components/languages/russian/ranks';

import RiotAPI from '../../../../services/riotAPI';

const PlayerRank = ({id, region}) => {
	const [loading, changeLoading] = useState(true);
	const [ranked, setRanked] = useState([]);

	const riotAPI = new RiotAPI();
	const ruObj = ranks();
	
	useEffect(() => {
		const getRank = async () => {
			const res = await riotAPI.getSumRanked(region, id);
			
			setRanked([res.tier, res.rank]);
			changeLoading(false);
		}
		getRank();
	}, [])

	if (loading) return null;
	if (ranked[0] === undefined) return <span className="rank">Нет рейтинга</span>;

	return <span className="rank">{ruObj[ranked[0].toLowerCase()]} {ranked[1]}</span>;
}

export default PlayerRank;