import React from 'react';

const Rating = ({ranked}) => {
	const ruObj = {iron: 'Железо', bronze: 'Бронза', silver: 'Серебро', gold: 'Золото', platinum: 'Платина', diamond: 'Алмаз', master: 'Мастер', grandmaster: 'Грандмастер', challenger: 'Претендент'}
	const {tier, rank, leaguePoints} = ranked;

	return(
		<div className="sum_rating">
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