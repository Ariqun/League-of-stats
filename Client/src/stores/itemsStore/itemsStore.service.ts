import axios from 'axios';

import { ImageTypes } from '../championsStore';

const itemsService = async (): Promise<DataTypes> => {
  const result = await axios('http://ddragon.leagueoflegends.com/cdn/11.21.1/data/ru_RU/item.json');
  return result.data;
};

export type SingleItemTypes = {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into: string[];
  image: ImageTypes;
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    [key: number]: boolean;
  };
  stats: {
    [key: string]: number;
  };
};

export type AllItemsTypes = {
  [key: string]: SingleItemTypes;
};

type DataTypes = {
  type: string;
  version: string;
  basic: {
    name: string;
    rune: {
      isrune: boolean;
      tier: number;
      type: string;
    };
    gold: {
      base: number;
      total: number;
      sell: number;
      purchasable: boolean;
    },
    group: string;
    description: string;
    colloq: string;
    plaintext: string;
    consumed: boolean;
    stacks: number;
    depth: number;
    consumeOnFull: boolean;
    from: any[];
    into: any[];
    specialRecipe: number;
    inStore: boolean;
    hideFromAll: boolean;
    requiredChampion: string;
    requiredAlly: string;
    stats: {
      [key: string]: number;
    };
    tags: any[];
    maps: {
      [key: number]: boolean;
    };
  };
  data: AllItemsTypes;
  groups: {
    id: string;
    MaxGroupOwnable: string;
  }[];
  tree: {
    header: string;
    tags: string[];
  }[];
};

export default itemsService;
