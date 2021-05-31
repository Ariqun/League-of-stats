const axios = require('axios');

module.exports = async () => {
	const versions = await axios('https://ddragon.leagueoflegends.com/api/versions.json');
	const version = versions.data[0];

	const res = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${version}/data/ru_RU/champion.json`);
	const arr = [];

	for (let elem in res.data.data) {
		const id = res.data.data[elem].key;
		const name = res.data.data[elem].id;

		arr.push([id, name]);
	}
	
	return arr;
}