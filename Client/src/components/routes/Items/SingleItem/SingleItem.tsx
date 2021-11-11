import React from 'react';

import { SingleItemTypes } from '../../../../stores/itemsStore';
import cl from './SingleItem.module.sass';

const SingleItem: React.FC<SingleItemProps> = ({
  item, type, types, inputValue, setActiveItem,
}) => {
  const exceptionTypes = ['Boots', 'Consumable', 'Trinket'];
  const exceptionItems = [3330, 3400, 3513, 3599, 3600];

  const {
    name, tags, image, gold,
  } = item;
  const id = parseInt(image.full);

  const lowerName = name.toLowerCase();
  const lowerValue = inputValue.toLowerCase();
  let show = false;

  if (lowerName.includes(lowerValue)) show = true;
  if (!show) return null;

  const isExteption = exceptionItems.includes(id);
  const isInTags = tags.some((elem) => types.includes(elem));
  const isValidType = type !== 'boots' && type !== 'consumable' && tags.some((elem) => exceptionTypes.includes(elem));

  if (isExteption || !isInTags || isValidType) return null;

  return (
    <div onClick={() => setActiveItem(name)} className={cl.item}>
      <img src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${image.full}`} alt={name} />
      <span>{gold.total}</span>
    </div>
  );
};

type SingleItemProps = {
  item: SingleItemTypes;
  type: string;
  types: string[];
  inputValue: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
};

export default SingleItem;
