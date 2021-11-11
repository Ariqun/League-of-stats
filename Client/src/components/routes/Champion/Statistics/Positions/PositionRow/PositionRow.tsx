import React from 'react';
import { useTranslation } from 'react-i18next';

import PopulationBar from '../../../../../ui/bars/PopulationBar';
import championStore from '../../../../../../stores/championStore';
import getMatchesAtPosition from '../../../../../../utils/actions/getMatchesAtPosition';
import cl from './PositionRow.module.sass';

const PositionRow: React.FC<PositionRowProps> = ({
  position,
}) => {
  const [t] = useTranslation();
  const { roles, matches } = championStore.championStats;
  const { matchesAtPos, winsAtPos } = getMatchesAtPosition(roles, position);

  return (
    <tr className={cl.position}>
      <td className={cl.type}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/positions/${position}.png`} alt={position} />
        <span className={cl.name}>
          {t(position)}
        </span>
      </td>

      <td className={cl.popularity}>
        <PopulationBar current={matchesAtPos} max={matches} pop />
      </td>

      <td className={cl.winrate}>
        <PopulationBar current={winsAtPos} max={matchesAtPos} />
      </td>
    </tr>
  );
};

type PositionRowProps = {
  position: string;
};

export default PositionRow;
