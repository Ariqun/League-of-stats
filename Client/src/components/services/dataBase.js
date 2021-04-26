import axios from 'axios';

export default class DataBase {
	pushChamps = async () => {
		const res = await axios({
			method: 'post',
			url: '/',
		});

		if (res.status !== 200) {
			throw new Error('DataBase pushChamps failed');
		}

		return res.data;
	}

	pushSummoners = async () => {
		const res = await axios({
			method: 'post',
			url: '/',
		});

		if (res.status !== 200) {
			throw new Error('DataBase pushSummoners failed');
		}

		return res.data;
	}

	getChampionFromDB = async (name) => {
		const res = await axios({
			method: 'post',
			url: '/champ',
			data: `champion=${name}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		
		if (res.status !== 200) {
			throw new Error('DataBase getChampionFromDB failed');
		}
		
		return res.data;
	}

	getSumRanked = async (sumId) => {
		const res = await axios({
			method: 'post',
			url: '/ranked',
			data: `sumId=${sumId}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) {
			throw new Error('RiotAPI getSumRanked failed');
		}
		
		return res.data;
	}
}