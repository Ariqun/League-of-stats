const infoForCanvas = (team, version) => {
	let res = [];
		
	for (let elem of team) {
		const {totalDamageDealtToChampions, magicDamageDealtToChampions, physicalDamageDealtToChampions, trueDamageDealtToChampions} = elem;
		const {totalHealsOnTeammates, totalDamageShieldedOnTeammates} = elem;
		let player = {};

		player.champ = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${elem.championName}.png`;
		player.dmg = {
			total: totalDamageDealtToChampions,
			physical: physicalDamageDealtToChampions,
			magic: magicDamageDealtToChampions,
			trueDmg: trueDamageDealtToChampions
		};
		player.heal = {
			total: totalHealsOnTeammates + totalDamageShieldedOnTeammates,
			restore: totalHealsOnTeammates,
			absorb: totalDamageShieldedOnTeammates
		};

		res.push(player);
	}

	return res;
}

export default infoForCanvas;