import axios from 'axios';

const versionService = async (): Promise<VersionTypes> => {
  const result = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
  return result.data;
};

type VersionTypes = Array<string>;

export default versionService;
