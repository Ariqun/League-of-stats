export default class DragonData {
	constructor(version, language) {
		this.version = version;
		this.language = language;
		this._url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`;
	}

	getData = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Blablabla');
		}

		return await res.json();
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

	getSummonerSpells = async (url) => {
		const sumSpells = await this.getData(url);
		return sumSpells.data;
	}

	getSummonerSpell = async (url, id) => {
		const sumSpells = await this.getData(url);
		let result = '';

		for (let obj in sumSpells.data) {
			if (sumSpells.data[obj].key == id) {
				result = sumSpells.data[obj].id;
			}
		}
		return this._transformSpell(result);
	}

	_transformSpell = (spell) => {
		return {
			spell: spell
		};
	}
}