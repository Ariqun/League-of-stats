import { AllItemsTypes } from '../../stores/itemsStore';

const filterItems = (items: AllItemsTypes, champItems: ChampItems, tag: string, main = false) => {
  const result = Object.keys(champItems).filter((item) => {
    const exceptionItems = ['2010', '3330', '3400', '3513', '3599', '3600'];
    const tags = items[item]?.tags;

    if (!tags) return null;

    if (!main && tags.includes(tag) && item !== '3513') return item;
    if (main && !tags.includes('Boots') && !tags.includes('Trinket') && !tags.includes('Lane') && !tags.includes('Consumables') && !exceptionItems.includes(item)) {
      return item;
    }

    return null;
  });

  return result;
};

type ChampItems = {
  [key: string]: number;
};

export default filterItems;
