const axios = require('axios');

const pushInvalidMatchIdInDB = require('./pushInvalidMatchIdInDB');

module.exports = async (url, func, region = 'ru') => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-1831eed6-c46d-4f3a-b58b-9a396e8ecc23"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => {
			if (func) result = func(res.data, region)
			if (!func) result = res.data;
		})
		.catch(err => {
			console.error(`Ошибка: ${err.response.status} ${err.response.statusText}`);

			const isCustomMatch = /RU_\d*/gi.test(url);

			if (err.response.status === 404 && isCustomMatch) {
				let matchId = '';
				url.replace(/RU_\d*/g, match => matchId = match);
				
				pushInvalidMatchIdInDB(matchId);
			}
		})

	return result;
}