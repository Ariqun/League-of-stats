import axios from 'axios';

export default class RiotAPI {
	getSummoner = async (region, name) => {
		console.log('Request')

		const res = await axios({
			method: 'post',
			url: '/summoner',
			data: `summoner=${name}&region=${region}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		
		if (res.status !== 200) throw new Error('RiotAPI getSummoner failed');
		
		return res.data;
	}

	getSumRanked = async (sumId, region) => {
		console.log('Request')

		const res = await axios({
			method: 'post',
			url: '/ranked',
			data: `sumId=${sumId}&region=${region}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) throw new Error('RiotAPI getSumRanked failed');
		
		return res.data;
	}

	getSumMatches = async (puuID) => {
		console.log('Request')

		const res = await axios({
			method: 'post',
			url: '/matches',
			data: `puuID=${puuID}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) throw new Error('RiotAPI getSumMatches failed');

		return res.data;
	}

	getMatchInfo = async (matchId) => {
		console.log('Request')
		const res = await axios({
			method: 'post',
			url: '/match',
			data: `matchID=${matchId}`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) throw new Error('RiotAPI getMatch failed');

		return res.data;
	}

	getLiveMatch = async (sumId, region) => {
		console.log('Request');

		const res = await axios({
			method: 'post',
			url: '/live',
			data: `sumId=${sumId}&region=${region}`,
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		})

		if (res.status !== 200) throw new Error('Riot API getLiveMatch failed');

		return res.data;
	}
}