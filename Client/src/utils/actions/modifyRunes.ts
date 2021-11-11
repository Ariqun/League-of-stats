import { SlotsType } from '../../stores/runesStore';

const modifyRunes = (slot: SlotsType, perks: PerksType): ReturnType => {
  const modified = slot.runes.reduce((acc: ReturnType, cur) => {
    if (perks[cur.id]) {
      acc.push({
        id: cur.id,
        count: perks[cur.id],
      });
    }

    return acc;
  }, []).sort((a, b) => b.count - a.count);

  return modified;
};

type PerksType = {
  [key: string]: number;
  total: number;
};

type ReturnType = {
  id: number;
  count: number;
}[];

export default modifyRunes;
