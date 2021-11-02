import React from 'react';
import { useTranslation } from 'react-i18next';

const Rating = ({ ranked, type }) => {
  const [t] = useTranslation();

  if (!ranked) {
    return (
      <div className="sum_rating">
        <div className="type">{type}</div>

        <div className="rank_block">
          <div className="rank_icon">
            <img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/unranked.png`} alt="unranked_emblem" />
          </div>
          <span className="rank_name">{t('unranked')}</span>
        </div>
      </div>
    );
  }

  const { tier, rank, leaguePoints } = ranked;

  return (
    <div className="sum_rating">
      <div className="type">{type}</div>

      <div className="rank_block">
        <div className="rank_icon">
          <img src={`${process.env.PUBLIC_URL}/assets/icons/ranked/${tier}.png`} alt={`${tier}_emblem`} />
        </div>
        <span className="rank_name">{t(tier.toLowerCase())} {rank}</span>
        <span className="rank_lp">LP: &nbsp;{leaguePoints}</span>
      </div>
    </div>
  );
};

export default Rating;
