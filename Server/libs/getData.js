const axios = require('axios');

module.exports = async (url, func, region = 'ru') => {
	const headers = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
		"Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
		"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
		"Origin": "https://developer.riotgames.com",
		"X-Riot-Token": "RGAPI-8e666e52-b6d4-4713-801e-500f60de9985"
	};
	let result = {};

	await axios.get(url, {headers: headers})
		.then(res => {
			if (func) result = func(res.data, region)
			if (!func) result = res.data;
		})
		.catch(err => {
			console.error(`Ошибка: ${err.response.status} ${err.response.statusText} - ${url}`);
		})

	return result;
}