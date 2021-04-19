import axios from 'axios';

export default class RiotAPI {
	getSummoner = async (region, name) => {
		const res = await axios({
			method: 'post',
			url: '/summoner',
			data: `summoner=${name}&region=${region}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) {
			throw new Error('RiotAPI getSummoner failed');
		}
		
		return res.data;
	}

	getSumMatches = async (puuID) => {
		const res = await axios({
			method: 'post',
			url: '/matches',
			data: `puuID=${puuID}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) {
			throw new Error('RiotAPI getSumMatches failed');
		}

		return res.data;
	}

	getMatchInfo = async (matchID) => {
		console.log('Request')

		const res = await axios({
			method: 'post',
			url: '/match',
			data: `matchID=${matchID}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) {
			throw new Error('RiotAPI getMatch failed');
		}

		return res.data;
	}
}