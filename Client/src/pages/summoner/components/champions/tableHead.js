import React from 'react';
import { useTranslation } from 'react-i18next';

const TableHead = ({ changeSort, sortBy }) => {
  const [t] = useTranslation();
  const titles = ['champ', 'games', 'winrate', 'kda', 'creeps', 'gold', 'dmg', 'heal', 'vision'];

  const content = titles.map((title) => {
    const className = sortBy === title ? 'head_item active' : 'head_item';

    return (
      <td onClick={() => changeSort(title)} className={className} key={title}>
        <div className="title">{t(title)}</div>
      </td>
    );
  });

  return (
    <tr className="table_head">
      {content}
    </tr>
  );
};

export default TableHead;
