import React from 'react';
import { useTranslation } from 'react-i18next';

import { calcRatio } from '../../../../utils/actionsWithNums/calcRatio';
import PlayerKDA from '../../../match/components/playerKDA';
import AvgBlock from './avgBlock';

const Average = ({ champStats }) => {
  const [t] = useTranslation();
  const {
    matches, creeps, gold, kda, dmg, combo,
  } = champStats;
  const { kills, deaths, assists } = kda;
  const { physical, magic, trueDmg } = dmg;
  const {
    double, triple, quadro, penta,
  } = combo;

  const avgKills = calcRatio(kills, matches, 1);
  const avgDeaths = calcRatio(deaths, matches, 1);
  const avgAssists = calcRatio(assists, matches, 1);
  const avgCreeps = calcRatio(creeps, matches, 1);
  const avgDmg = calcRatio((physical + magic + trueDmg), matches) / 1000;
  const avgGold = calcRatio(gold, matches) / 1000;
  const avgDouble = calcRatio(double, matches, 4);
  const avgTriple = calcRatio(triple, matches, 4);
  const avgQuadro = calcRatio(quadro, matches, 4);
  const avgPenta = calcRatio(penta, matches, 4);

  return (
    <div className="average">
      <div className="avg_title">{t('average')}</div>

      <div className="avg_wrapper">
        <div className="avg_stat kda col-6">
          <span className="title">KDA</span>
          <PlayerKDA kills={avgKills} deaths={avgDeaths} assists={avgAssists} />
        </div>

        <AvgBlock type="creeps" value={avgCreeps} />
        <AvgBlock type="dmg" value={avgDmg} />
        <AvgBlock type="gold" value={avgGold} />
      </div>

      <div className="avg_combo">
        <AvgBlock type="penta" value={avgPenta} combo />
        <AvgBlock type="quadra" value={avgQuadro} combo />
        <AvgBlock type="triple" value={avgTriple} combo />
        <AvgBlock type="double" value={avgDouble} combo />
      </div>
    </div>
  );
};

export default Average;
