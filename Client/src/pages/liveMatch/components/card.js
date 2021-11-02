import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PlayerRank from '../../match/components/playerRank';
import PlayerKDA from '../../match/components/playerKDA';
import PlayerSpells from '../../match/components/playerSpells';
import { findPercent } from '../../../utils/actionsWithNums/findPercent';
import { calcRatio } from '../../../utils/actionsWithNums/calcRatio';
import { LoadingBlock } from '../../../components/loading';
import DataBase from '../../../services/dataBase';

const Card = ({
  player, region = 'ru', champions, runes, version,
}) => {
  const [isLoading, changeLoading] = useState(true);
  const [champion, setChampion] = useState('');
  const [summoner, setSummoner] = useState({});
  const [t] = useTranslation();

  const {
    summonerId, championId, summonerName, spell1Id, spell2Id,
  } = player;

  useEffect(() => {
    const getInfo = async () => {
      const db = new DataBase();
      const champRes = await db.getChampionStats(championId);
      const sumRes = await db.getSumStatistics(summonerId);

      setChampion(champRes);
      setSummoner(sumRes);
      changeLoading(false);
    };
    getInfo();
  }, [championId, summonerId]);

  if (isLoading) return <LoadingBlock />;

  const name = Object.keys(champions).filter((champ) => +champions[champ].key === championId);
  let champWins = 0; let champMatches = 0; let champWinrate = 0; let champKills = 0; let champDeaths = 0; let
    champAssists = 0;

  const { perkStyle, perkSubStyle } = player.perks;
  const prim = runes.find((rune) => rune.id === perkStyle);
  const main = prim.slots[0].runes[0];
  const sub = runes.find((rune) => rune.id === perkSubStyle);

  if (summoner.length !== 0 && summoner.champions[0][name]) {
    const champ = summoner.champions[0][name];
    const { wins, matches } = champ.total.results;
    const { kills, deaths, assists } = champ.total.kda;

    champWins = wins;
    champMatches = matches;
    champWinrate = findPercent(champWins, champMatches);
    champKills = calcRatio(kills, champMatches, 1);
    champDeaths = calcRatio(deaths, champMatches, 1);
    champAssists = calcRatio(assists, champMatches, 1);
  }

  const detectRole = () => {
    const arr = [];

    for (const key in champion.roles) {
      if (!champion.roles[key][0]) arr.push({ [key]: 0 });
      if (champion.roles[key][0]) arr.push({ [key]: champion.roles[key][0].matches });
    }

    arr.sort((a, b) => {
      const keyA = Object.keys(a)[0];
      const keyB = Object.keys(b)[0];

      return b[keyB] - a[keyA];
    });

    return Object.keys(arr[0])[0];
  };

  const role = detectRole();

  return (
    <div className={`player_card ${role} col-5 col-sm-4 col-md-3 col-lg-2`}>
      <Link to={`/summoner/${region}/${summonerName}`} className="player_name">
        {summonerName}
      </Link>

      <div className="champ_icon">
        <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${name[0]}.png`} alt={`${name[0]}_img`} />
      </div>

      <div className="champ_stats">
        <div className="winrate">{champWinrate}%
          <span>({champMatches} {t('played')})</span>
        </div>

        <PlayerKDA kills={champKills} deaths={champDeaths} assists={champAssists} live />
      </div>

      <PlayerRank id={summonerId} region={region} live />

      <div className="player_settings">
        <div className="runes">
          <div className="rune prim"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${main.icon}`} alt={`${main.name}_icon`} /></div>
          <div className="rune sub"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${sub.icon}`} alt={`${sub.name}_icon`} /></div>
        </div>

        <div className="role">
          <img src={`${process.env.PUBLIC_URL}/assets/icons/positions/${role}.png`} alt={`${role}_icon`} />
        </div>

        <PlayerSpells firstId={spell1Id} secondId={spell2Id} />
      </div>

      <div className="background">
        <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name[0]}_0.jpg`} alt={`${name}_img`} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  version: state.version,
  champions: state.champions,
  runes: state.runes,
  spells: state.spells,
});

export default connect(mapStateToProps)(Card);
