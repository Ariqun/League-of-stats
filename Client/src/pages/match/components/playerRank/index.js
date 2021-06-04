import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

import RiotAPI from '../../../../services/riotAPI';
import './index.sass';

const PlayerRank = ({id, region, live = false}) => {
	const [isLoading, changeLoading] = useState(true);
	const [ranked, setRanked] = useState([]);
	const [t] = useTranslation();
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
	
	if (!live && ranked.length === 0) return <span className="rank_name">{t('unranked')}</span>
	if (live && ranked.length === 0) {
		return(
			<div className="player_rank">
				<div className="rank_icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/unranked.png`} alt={'unranked_emblem'}></img>
				</div>
				<span className="rank_name">{t('unranked')}</span>
			</div>
		)
	}

	const {tier, rank, leaguePoints, wins, losses} = ranked[0];
	const lowerTier = tier.toLowerCase();

	if (live) {
		const matches = wins + losses;
		const winrate = (wins * 100 / matches).toFixed();

		return(
			<div className="player_rank">
				<div className="rank_icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/${tier}.png`} alt={`${tier}_emblem`}></img>
				</div>

				<div className="rank_wrapper">
					<div className="rank_name">{t(lowerTier)} {rank}</div>
					<span className="rank_lp">LP: &nbsp;{leaguePoints}</span>
					<span className="matches">{winrate}% <span>({matches} {t('played')})</span></span>
				</div>
			</div>
		)
	}

	return <span className="rank_name">{t(lowerTier)} {rank}</span>;
}

export default PlayerRank;