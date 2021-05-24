import React from 'react';

import {ranks} from '../../../../components/languages/russian/ranks';

const Rating = ({ranked, type}) => {
	if (!ranked) {
		return(
			<div className={`sum_rating`}>
				<div className="type">{type}</div>

				<div className="rank_block">
					<div className="rank_icon">
						<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/unranked.png`} alt={'unranked_emblem'}></img>
					</div>
					<span className="rank_name">Нет рейтинга</span>
				</div>
			</div>
		)
	}

	const ruObj = ranks();
	let {tier, rank, leaguePoints} = ranked;

	return(
		<div className={`sum_rating`}>
			<div className="type">{type}</div>

			<div className="rank_block">
				<div className="rank_icon">
					<img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/${tier}.png`} alt={`${tier}_emblem`}></img>
				</div>
				<span className="rank_name">{ruObj[tier.toLowerCase()]} {rank}</span>
				<span className="rank_lp">LP: &nbsp;{leaguePoints}</span>
			</div>
		</div>
	)
}

export default Rating;