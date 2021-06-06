const getChamps = require('./getChamps');

module.exports = async (res) => {
	const arrOfChamps = await getChamps();
	const mastery = [];
	
	for (let champ of res) {
		const {championId, championLevel, championPoints} = champ;

		const champion = arrOfChamps.find(champ => champ[0] == championId);

		mastery.push({championId, championName: champion[1], championLevel, championPoints});
	}

	return mastery;
}