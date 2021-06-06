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

	getAllChampionsStats = async () => {
		const res = await axios({
			method: 'post',
			url: '/champions'
		});

		if (res.status !== 200) {
			throw new Error('DataBase getAllChampionsStats failed');
		}

		return res.data;
	}

	getSumStatistics = async (sumId) => {
		const res = await axios({
			method: 'post',
			url: '/sumStatistics',
			data: `sumId=${sumId}`,
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		});

		if (res.status !== 200) {
			throw new Error('DataBase getSumStatistics failed');
		}

		return res.data;
	}

	getMatchInfo = async (matchId, region) => {
		const res = await axios({
			method: 'post',
			url: '/match',
			data: `matchId=${matchId}&region=${region}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) throw new Error('DataBase getMatchInfo failed');
		
		return res.data;
	}
}