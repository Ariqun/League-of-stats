import axios from 'axios';

import { InfoTypes, ImageTypes, StatTypes } from '../championsStore';

const championService = async (name: string): Promise<DataTypes> => {
  const result = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.21.1/data/ru_RU/champion/${name}.json`);
  return result.data;
};

export type SkinTypes = {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
};

export type SpellTypes = {
  id: string;
  name: string;
  description: string;
  tooltip?: string;
  leveltip?: {
    label: string[];
    effect: string[];
  };
  maxrank?: number;
  cooldown?: number[];
  cooldownBurn?: string;
  cost?: number[];
  constburn?: string;
  datavalues?: {};
  effect?: (null | number[])[];
  effectBurn?: (null | string)[];
  vars?: [];
  costType?: string;
  maxammo?: string;
  range?: number[];
  rangeBurn?: string;
  image: ImageTypes;
  resource?: string;
};

export type ChampionTypes = {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ImageTypes;
  skins: SkinTypes[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: InfoTypes;
  stats: StatTypes;
  spells: SpellTypes[];
  passive: {
    id: string;
    name: string;
    description: string;
    image: ImageTypes;
  }
};

type DataTypes = {
  type: string;
  format: string;
  version: string;
  data: {
    [key: string]: ChampionTypes;
  };
};

export default championService;
