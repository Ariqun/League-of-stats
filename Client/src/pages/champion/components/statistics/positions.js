import React from 'react';
import { useTranslation } from 'react-i18next';

import RateBar from '../../../../components/progressBars/rateBar';

const Positions = ({ champStats }) => {
  const { roles, matches } = champStats;
  const pos = ['top', 'jungle', 'middle', 'bottom', 'utility'];
  const [t] = useTranslation();

  const result = pos.map((position) => {
    let matchesAtPos = 0; let
      winsAtPos = 0;

    for (const key in roles) {
      if (key === position) {
        if (!roles[key][0]) continue;

        matchesAtPos = roles[key][0].matches;
        winsAtPos = roles[key][0].wins;
      }
    }

    return (
      <tr className={`position ${position}`} key={position}>
        <td className="position_type">
          <img src={`${process.env.PUBLIC_URL}/assets/icons/positions/${position}.png`} alt={`${position}_icon`} />
          <span className="position_name">{t(position)}</span>
        </td>

        <td className="popularity">
          <RateBar current={matchesAtPos} max={matches} pop />
        </td>

        <td className="winrate">
          <RateBar current={winsAtPos} max={matchesAtPos} />
        </td>
      </tr>
    );
  });

  return (
    <table className="positions">
      <tbody>
        <tr className="head">
          <th>{t('position')}</th>
          <th>{t('popularity')}</th>
          <th>{t('winrate')}</th>
        </tr>
        {result}
      </tbody>
    </table>
  );
};

export default Positions;
