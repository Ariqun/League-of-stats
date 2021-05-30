import axios from 'axios';
export default class DataBase {
	getChampionStats = async (id) => {
		const res = await axios({
			method: 'post',
			url: '/champion',
			data: `champ=${id}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

		if (res.status !== 200) {
			throw new Error('DataBase getChampionStats failed');
		}

		return res.data;
	}

	getSumStatistics = async (id) => {
		const res = await axios({
			method: 'post',
			url: '/sumStatistics',
			data: `sumId=${id}`,
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		});

		if (res.status !== 200) {
			throw new Error('DataBase getSumStatistics failed');
		}

		return res.data;
	}

	getMatchInfo = async (matchId) => {
		const res = await axios({
			method: 'post',
			url: '/match',
			data: `matchID=${matchId}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) throw new Error('DataBase getMatchInfo failed');

		return res.data;
	}
}