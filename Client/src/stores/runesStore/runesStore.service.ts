import axios from 'axios';

const runesService = async (): Promise<RuneStyleType[]> => {
  const result = await axios.get('http://ddragon.leagueoflegends.com/cdn/11.21.1/data/ru_RU/runesReforged.json');
  return result.data;
};

export type RuneType = {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
};

export type SlotsType = {
  runes: RuneType[];
};

export type RuneStyleType = {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: SlotsType[];
};

export default runesService;
