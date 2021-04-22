import axios from 'axios';

export default class DragonData {
	constructor(version, language) {
		this.version = version;
		this.language = language;
		this._url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`;
	}

	getData = async (url) => {
		const res = await axios(url);

		if (res.status !== 200) {
			throw new Error('Blablabla');
		}

		return res.data;
	}

	getLatestVersion = async () => {
		const versions = await this.getData('https://ddragon.leagueoflegends.com/api/versions.json');

		return versions[0];
	}

	getAllChampions = async (url) => {
		const champions = await this.getData(url);
		return champions.data;
	}

	getChampion = async (url) => {
		const champion = await this.getData(url);
		return champion.data;
	}

	getGameType = async (url, id) => {
		const types = await this.getData(url);
		let res = '';

		for (let obj of types) {
			if (obj.queueId === id) {
				res = obj.description;
			}
		}

		res = res.replace(/games/, '').trim();

		return res;
	}

	getSummonerSpells = async (url) => {
		const sumSpells = await this.getData(url);
		return sumSpells.data;
	}

	getSummonerSpell = async (url, id) => {
		const sumSpells = await this.getData(url);
		const {data} = sumSpells;
		let result = '';
		
		for (let obj in data) {
			if (+data[obj].key === id) {
				result = data[obj].id;
			}
		}
		
		return result;
	}

	getAllRunes = async (url) => {
		const runes = await this.getData(url);
		return runes;
	}

	getStyle = async (url, style) => {
		const styles = await this.getData(url);
		let res = '';

		for (let obj of styles) {
			if (obj.id === style) {
				res = obj.icon;
			}
		}
		
		return res;
	}

	getRune = async (url, style, id) => {
		const runes = await this.getData(url);
		let result = {};
		let res;

		for (let obj of runes) {
			if (obj.id === style) {
				result = {...obj}
			}
		}

		for (let obj in result.slots[0].runes) {
			if (result.slots[0].runes[obj].id === id) {
				res = result.slots[0].runes[obj].icon;
			}
		}

		return res;
	}
}