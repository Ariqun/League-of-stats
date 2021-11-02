import React from 'react';
import { connect } from 'react-redux';

const TeamBans = ({
  teamId, info, champions, version,
}) => {
  const team = info.teams.find((team) => team.teamId === teamId);
  const champs = Object.values(champions);

  const bans = team.bans.map((item) => {
    const champ = champs.find((champ) => +champ.key === item.championId);

    if (!champ) return null;

    const { id, image } = champ;

    return (
      <div className="banned_champ" key={item.championId}>
        <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${image.full}`} alt={`${id}_icon`} />
      </div>
    );
  });

  return (
    <div className={teamId === 100 ? 'bans left' : 'bans right'}>
      {bans}
    </div>
  );
};

const setStateToProps = (state) => ({
  version: state.version,
  champions: state.champions,
});

export default connect(setStateToProps)(TeamBans);
