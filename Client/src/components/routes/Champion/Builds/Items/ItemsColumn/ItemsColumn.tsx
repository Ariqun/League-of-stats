import React, { useState } from 'react';

import SingleItem from '../SingleItem';
import ShowAllBtn from '../../../../../ui/buttons/ShowAllBtn';
import Loading from '../../../../../Loading';
import filterByFullItems from '../../../../../../utils/actions/filterByFullItems';
import filterItems from '../../../../../../utils/actions/filterItems';
import itemsStore from '../../../../../../stores/itemsStore';
import championStore from '../../../../../../stores/championStore';
import cl from './ItemsColumn.module.sass';

const ItemsColumn: React.FC<ItemsColumnProps> = ({ column }) => {
  const [isShowAll, setShowAll] = useState(false);

  const { matches, items: championItems } = championStore.championStats;
  delete championItems[0];

  const { allItems, isLoading, isError } = itemsStore;
  const {
    title, trigger, tag, isMain,
  } = column;

  const blockItems = filterItems(allItems, championItems, tag, isMain);
  const itemsArray = filterByFullItems(allItems, blockItems, championItems);

  const handleShowAll = () => setShowAll(true);

  if (isLoading) return <Loading />;

  return (
    <div className={cl.column}>
      <div className={cl.title}>{title}</div>

      {itemsArray.map((item, i) => (
        <SingleItem
          item={item}
          matches={matches}
          index={i}
          isShowAll={isShowAll}
          key={item.id}
        />
      ))}

      <ShowAllBtn isShowAll={isShowAll} handleShowAll={handleShowAll} trigger={trigger} />
    </div>
  );
};

type ItemsColumnProps = {
  column: {
    title: string;
    trigger: boolean;
    tag: string;
    isMain?: boolean;
  }
};

export default ItemsColumn;
