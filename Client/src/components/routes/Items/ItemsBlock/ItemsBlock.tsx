import React from 'react';
import { useTranslation } from 'react-i18next';

import SingleItem from '../SingleItem';
import Loading from '../../../Loading';
import itemsStore from '../../../../stores/itemsStore';
import modifyItems from '../../../../utils/actions/modifyItems';
import cl from './ItemsBlock.module.sass';

const ItemsBlock: React.FC<ItemsBlockProps> = ({
  type, inputValue, setActiveItem,
}) => {
  const [t] = useTranslation();
  const { allItems, isLoading } = itemsStore;
  const modifiedItems = modifyItems(allItems);

  let types = ['Damage', 'AttackSpeed', 'SpellDamage', 'CooldownReduction', 'Health', 'Armor', 'SpellBlock', 'NonbootsMovement', 'OnHit', 'ManaRegen', 'Active'];
  if (type === 'consumable') types = ['Consumable', 'Trinket'];
  if (type === 'boots') types = ['Boots'];

  if (isLoading) return <Loading />;

  return (
    <div className={cl.block}>
      <div className={cl.title}>
        {t(type)}
      </div>

      <div className={cl.wrapper}>
        {modifiedItems.map((item) => (
          <SingleItem
            item={item}
            type={type}
            types={types}
            inputValue={inputValue}
            setActiveItem={setActiveItem}
          />
        ))}
      </div>
    </div>
  );
};

type ItemsBlockProps = {
  type: string;
  inputValue: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
};

export default ItemsBlock;
