import { AllItemsTypes } from '../../stores/itemsStore';

const filterByFullItems = (items: AllItemsTypes, blockItems: string[], championItems: { [key: string]: number }) => {
  const championItemNames = Object.keys(championItems);

  const filtered = blockItems.reduce((acc: FilteredTypes, cur: string) => {
    if (championItemNames.includes(cur) && !items[cur].into) {
      acc.push({
        id: cur,
        count: championItems[cur],
      });
    }

    return acc;
  }, []).sort((a, b) => b.count - a.count);

  return filtered;
};

type FilteredTypes = {
  id: string;
  count: number;
}[];

export default filterByFullItems;
