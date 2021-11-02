import React from 'react';

import ChampBanner from './champBanner';
import SumBanner from './sumBanner';
import CheckLiveMatch from './checkLiveMatch';

import './index.sass';

const Promo = ({ summoner, statistics }) => {
  const {
    name, lvl, iconId, ranked, region, sumId,
  } = summoner;

  return (
    <div className="promo">
      <SumBanner name={name} ranked={ranked} lvl={lvl} iconID={iconId} />

      <div className="sum">
        <div className="name">{name}</div>
        <div className="region">({region})</div>
        <CheckLiveMatch name={name} sumId={sumId} region={region} />
      </div>

      <ChampBanner statistics={statistics} />
    </div>
  );
};

export default Promo;
