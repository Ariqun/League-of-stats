import React from 'react';

import MatchResult from '../matchResult';
import PlayerKDA from '../playerKDA';

import './index.sass';

const TeamScore = ({ teamId, info }) => {
  const { teams, participants, gameDuration } = info;

  const teamStats = teams.find((team) => team.teamId === teamId);
  const { objectives } = teamStats;
  const players = [];
  let isSurrender = '';

  for (const player of participants) {
    if (player.teamId === teamId) {
      const { win, gameEndedInEarlySurrender, gameEndedInSurrender } = player;

      isSurrender = !win && (gameEndedInEarlySurrender || gameEndedInSurrender);

      players.push(player);
    }
  }

  const kills = players.reduce((acc, el) => acc += el.kills, 0);
  const deaths = players.reduce((acc, el) => acc += el.deaths, 0);
  const assists = players.reduce((acc, el) => acc += el.assists, 0);

  return (
    <div className={teamId === 100 ? 'left_team col-4' : 'right_team col-4'}>
      <div className="result">
        <MatchResult teams={teams} teamId={teamId} duration={gameDuration} surrender={isSurrender} />

        <PlayerKDA kills={kills} deaths={deaths} assists={assists} />
      </div>

      <div className="objects">
        {Object.keys(objectives).map((obj) => {
				  if (obj === 'champion') return null;

				  return (
  <div className={`object ${obj}`} key={obj}>
    <div className="obj_icon" />
    <span className="amount">{objectives[obj].kills}</span>
  </div>
				  );
        })}
      </div>
    </div>
  );
};

export default TeamScore;
