import axios from 'axios';

const championsService = async (): Promise<DataTypes> => {
  const result = await axios.get('http://ddragon.leagueoflegends.com/cdn/11.21.1/data/ru_RU/champion.json');
  return result.data;
};

export type InfoTypes = {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
};

export type ImageTypes = {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type StatTypes = {
  [key: string]: number;
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
};

export type AllChampionTypes = {
  [key: string]: {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: InfoTypes;
    image: ImageTypes;
    tags: string[];
    partype: string;
    stats: StatTypes;
  }
};

type DataTypes = {
  type: string;
  format: string;
  version: string;
  data: AllChampionTypes;
};

export default championsService;
