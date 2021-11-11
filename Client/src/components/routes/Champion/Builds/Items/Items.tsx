import React from 'react';
import { useTranslation } from 'react-i18next';

import ItemsColumn from './ItemsColumn';
import cl from './Items.module.sass';

const Items: React.FC = () => {
  const [t] = useTranslation();

  const columns = [
    {
      title: t('coreItems'), trigger: true, tag: '', isMain: true,
    },
    { title: t('boots'), trigger: false, tag: 'Boots' },
    { title: t('trinkets'), trigger: false, tag: 'Trinket' },
  ];

  return (
    <div className={cl.column}>
      <div className={cl.title}>{t('itemPopularity')}</div>

      <div className={cl.wrapper}>
        {columns.map((column) => <ItemsColumn column={column} key={column.title} />)}
      </div>
    </div>
  );
};

export default Items;
