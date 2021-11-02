import axios from 'axios';

export default class DragonData {
  constructor(version, language) {
    this.version = version;
    this.language = language;
  }

  getData = async (url) => {
    const res = await axios(url);

    if (res.status !== 200) {
      throw new Error('DragonData error');
    }

    return res.data;
  };

  getLatestVersion = async () => {
    const versions = await this.getData('https://ddragon.leagueoflegends.com/api/versions.json');

    return versions[0];
  };

  getMatchTypes = async () => {
    const url = 'http://static.developer.riotgames.com/docs/lol/queues.json';
    const types = await this.getData(url);

    return types;
  };

  getAllChampions = async () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/champion.json`;
    const champions = await this.getData(url);

    return champions.data;
  };

  getChampion = async (name) => {
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/champion/${name}.json`;
    const champion = await this.getData(url);

    return champion.data[name];
  };

  getSummonerSpells = async () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/summoner.json`;
    const sumSpells = await this.getData(url);

    return sumSpells.data;
  };

  getAllRunes = async () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/runesReforged.json`;
    const runes = await this.getData(url);

    return runes;
  };

  getAllItems = async () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/${this.version}/data/${this.language}/item.json`;
    const res = await this.getData(url);

    return res.data;
  };
}
