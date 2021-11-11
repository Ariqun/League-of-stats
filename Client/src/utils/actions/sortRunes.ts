import { ChampionRunesType } from '../../stores/championStore';

const sortRunes = (runes: ChampionRunesType) => {
  const result = [];

  for (const key in runes) {
    result.push({ [key]: runes[key] });
  }

  result.sort((a, b) => {
    const aObj = a[Object.keys(a)[0]];
    const bObj = b[Object.keys(b)[0]];

    const aMax = Math.max(...Object.values(aObj));
    const bMax = Math.max(...Object.values(bObj));

    return bMax - aMax;
  });

  return result;
};

export default sortRunes;
