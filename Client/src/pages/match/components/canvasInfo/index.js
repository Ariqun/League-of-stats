import {modifyChampName} from "../../../../components/manipulationsWithStr/modifyChampName";

const canvasInfo = (teamId, participants, version) => {
	const players = [];
	let res = [];

	for (let player of participants) {
		if (player.teamId === teamId) players.push(player);
	}
		
	for (let elem of players) {
		const {totalDamageDealtToChampions, magicDamageDealtToChampions, physicalDamageDealtToChampions, trueDamageDealtToChampions} = elem;
		const {totalHealsOnTeammates, totalDamageShieldedOnTeammates} = elem;
		const champName = modifyChampName(elem.championName);
		let player = {};

		player.champ = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`;
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

export default canvasInfo;