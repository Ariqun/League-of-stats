import React from 'react';
import { useTranslation } from 'react-i18next';

import { checkBigNum } from '../../../../utils/actionsWithNums/checkNums';
import { transformSeconds, transformDate } from '../../../../utils/actionsWithNums/transformTime';

const Card = ({ records }) => {
  const [t] = useTranslation();
  const titles = ['kills', 'deaths', 'assists', 'kda', 'dmg', 'healAndShields', 'creeps', 'gold', 'vision', 'wards', 'dmgTaken', 'CC', 'killingSpree', 'double', 'triple', 'quadra', 'penta'];

  const createCard = (record, value, matchDate = 0, matchType = 0, champName = 'Teemo') => {
    const title = titles.find((item) => item === record);
    const styles = value === 0 ? { opacity: 0 } : null;

    return (
      <div className="card col-2" key={title}>
        <div className="title">{t(title)}</div>
        <div className="value">{value}</div>

        <div className="other" style={styles}>
          <div className="date">{matchDate}</div>
          <div className="type">{t(matchType)}</div>
        </div>

        <div className="background">
          <img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/Loading/${champName}_0.jpg`} alt={`${champName}_img`} />
        </div>
      </div>
    );
  };

  const content = Object.keys(records).map((record) => {
    const {
      value, date, champName, matchType,
    } = records[record];

    if (value === 0) return createCard(record, value);

    const matchDate = transformDate(date);
    let num = checkBigNum(value, 'digits');

    if (record === 'CC') num = transformSeconds(value);

    return createCard(record, num, matchDate, matchType, champName);
  });

  return <div className="block">{content}</div>;
};

export default Card;
