import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.sass';

const MatchResult = ({
  teams, teamId, duration, surrender,
}) => {
  const [t] = useTranslation();

  if (duration < 300000) return <div className="remake">{t('remake')}</div>;

  for (const team of teams) {
    if (team.teamId === teamId) {
      return (
        <div className={team.win ? 'win' : 'defeat'}>
          {team.win ? t('win') : t('defeat')}
          <span className="surrender"> {surrender ? `(${t('surrender')})` : ''}</span>
        </div>
      );
    }
  }
};

export default MatchResult;
