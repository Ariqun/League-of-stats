import React, {useState, useEffect} from 'react';

import RiotAPI from '../services/riotAPI';

function PlayerRank({id, region}) {
	const [loading, changeLoading] = useState(true);
	const [ranked, setRanked] = useState([]);

	const riotAPI = new RiotAPI();
	const ruObj = {
		iron: 'Железо', 
		bronze: 'Бронза', 
		silver: 'Серебро', 
		gold: 'Золото', 
		platinum: 'Платина', 
		diamond: 'Алмаз', 
		master: 'Мастер', 
		grandmaster: 'Грандмастер', 
		challenger: 'Претендент'
	};
	
	useEffect(() => {
		const getRank = async () => {
			const res = await riotAPI.getSumRanked(region, id);
			
			setRanked([res.tier, res.rank]);
			changeLoading(false);
		}
		getRank();
	}, [])

	const render = () => {
		if (loading) return null;

		if (ranked[0] === undefined) return <span className="rank">Нет рейтинга</span>;

		return(
			<span className="rank">{ruObj[ranked[0].toLowerCase()]} {ranked[1]}</span>
		)
	}

	return render();
}

export default PlayerRank;