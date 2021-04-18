export default class RiotAPI {
	getSummoner = async (region, name) => {
		const res = await fetch('/summoner', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `summoner=${name}&region=${region}`
		});

		if (!res.ok) {
			throw new Error('RiotAPI getSummoner failed');
		}
		return await res.json();
	}

	getSumMatches = async (puuID) => {
		const res = await fetch('/matches', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `puuID=${puuID}`
		});

		if (!res.ok) {
			throw new Error('RiotAPI getSumMatches failed');
		}

		return await res.json();
	}

	getMatchInfo = async (matchID) => {
		console.log('Request')
		const res = await fetch('/match', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `matchID=${matchID}`
		});

		if (!res.ok) {
			throw new Error('RiotAPI getMatch failed');
		}

		return await res.json();
	}
}