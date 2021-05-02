import axios from 'axios';
export default class DataBase {
	start = async () => {
		const res = await axios({
			method: 'post',
			url: '/'
		});

		if (res.status !== 200) {
			throw new Error('DataBase start failed');
		}
	}

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
}