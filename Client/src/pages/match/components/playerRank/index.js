import React, {useState, useEffect} from 'react';

import {ranks} from '../../../../components/languages/russian/ranks';

import RiotAPI from '../../../../services/riotAPI';

const PlayerRank = ({id, region, live = false}) => {
	const [isLoading, changeLoading] = useState(true);
	const [ranked, setRanked] = useState([]);
	const riotAPI = new RiotAPI();
	
	useEffect(() => {
		const getRank = async () => {
			const res = await riotAPI.getSumRanked(id, region);

			setRanked(...Object.values(res));
			changeLoading(false);
		}
		getRank();
	}, [])

	if (isLoading) return null;
	
	if (!live && ranked.length === 0) return <span className="rank_name">Нет рейтинга</span>
	if (live && ranked.length === 0) {
		return(
			<div className="player_rank">
				<div className="rank_icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/unranked.png`} alt={'unranked_emblem'}></img>
				</div>
				<span className="rank_name">Нет рейтинга</span>
			</div>
		)
	}

	const {tier, rank, leaguePoints, wins, losses} = ranked[0];
	const ruRanks = ranks();

	if (live) {
		const matches = wins + losses;
		const winrate = (wins * 100 / matches).toFixed();

		return(
			<div className="player_rank">
				<div className="rank_icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/${tier}.png`} alt={`${tier}_emblem`}></img>
				</div>

				<div className="rank_wrapper">
					<div className="rank_name">{ruRanks[tier.toLowerCase()]} {rank}</div>
					<span className="rank_lp">LP: &nbsp;{leaguePoints}</span>
					<span className="matches">{winrate}% <span>({matches} всего)</span></span>
				</div>
			</div>
		)
	}

	return <span className="rank_name">{ruRanks[tier.toLowerCase()]} {rank}</span>;
}

export default PlayerRank;