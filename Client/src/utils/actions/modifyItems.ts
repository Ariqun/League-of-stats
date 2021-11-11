import { AllItemsTypes } from '../../stores/itemsStore';

const modifyItems = (obj: AllItemsTypes) => {
  const items = Object.keys(obj).map((key) => obj[key]);

  items.sort((a, b) => a.gold.total - b.gold.total);

  return items;
};

export default modifyItems;
