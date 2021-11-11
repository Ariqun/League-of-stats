import axios from 'axios';

import { InfoTypes, ImageTypes, StatTypes } from '../championsStore';

const championService = async (name: string): Promise<DataTypes> => {
  const info = await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.21.1/data/ru_RU/champion/${name}.json`);
  const stats = await axios({
    method: 'post',
    url: '/champion',
    data: `champ=${name}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  return [info.data, stats.data];
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

export type ChampionInfoTypes = {
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

type ChampionInfoDataTypes = {
  type: string;
  format: string;
  version: string;
  data: {
    [key: string]: ChampionInfoTypes;
  };
};

export type ChampionKDAType = {
  kills: number;
  assists: number;
  deaths: number;
};

export type ChampionComboType = {
  double: number;
  triple: number;
  quadra: number;
  penta: number;
};

export type ChampionDmgType = {
  magic: number;
  physical: number;
  trueDmg: number;
};

export type ChampionRolesType = {
  [key: string]: {
    matches: number;
    wins: number;
  };
};

export type ChampionRunesType = {
  [key: string]: {
    [key: string]: number;
    total: number;
  };
};

export type ChampionStatsTypes = {
  id: string;
  name: string;
  totalMatches: number;
  matches: number;
  wins: number;
  losses: number;
  bans: number;
  creeps: number;
  gold: number;
  kda: ChampionKDAType;
  combo: ChampionComboType;
  roles: ChampionRolesType;
  dmg: ChampionDmgType;
  heal: {
    restore: number;
    shield: number;
  };
  items: {
    [key: string]: number;
  };
  runes: ChampionRunesType;
};

type DataTypes = [ChampionInfoDataTypes, ChampionStatsTypes];

export default championService;
