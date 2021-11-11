import React from 'react';
import { useTranslation } from 'react-i18next';

import PositionRow from './PositionRow';
import cl from './Positions.module.sass';

const Positions: React.FC = () => {
  const [t] = useTranslation();
  const positions = ['top', 'jungle', 'middle', 'bottom', 'utility'];

  return (
    <table className={cl.positions}>
      <thead>
        <tr className={cl.head_row}>
          <th>{t('position')}</th>
          <th>{t('popularity')}</th>
          <th>{t('winrate')}</th>
        </tr>
      </thead>

      <tbody>
        {positions.map((position) => <PositionRow position={position} key={position} />)}
      </tbody>
    </table>
  );
};

export default Positions;
