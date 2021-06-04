const champion = require('../models/champion');

module.exports = async (champInfo) => {
	for (let key in champInfo) {
		const {kills, deaths, assists, physical, magic, trueDmg, restore, shield, creeps, gold, double, triple, quadra, penta} = champInfo[key];
		const {win, items, doubleStyles, runes, id, name} = champInfo[key];
		const [item0, item1, item2, item3, item4, item5, item6] = items;
		const [rune0, rune1, rune2, rune3, rune4, rune5] = runes;
		const role = (champInfo[key].role).toLowerCase();
		const loose = win ? 0 : 1;

		await champion.updateOne({id: key}, {
			id: id,
			name: name,
			$inc: {
				wins: win,
				losses: loose,
				matches: 1,
				"kda.kills": kills,
				"kda.deaths": deaths,
				"kda.assists": assists,
				"dmg.physical": physical,
				"dmg.magic": magic,
				"dmg.trueDmg": trueDmg,
				"heal.restore": restore,
				"heal.shield": shield,
				"creeps": creeps,
				"gold": gold,
				"combo.double": double,
				"combo.triple": triple,
				"combo.quadra": quadra,
				"combo.penta": penta,
				[`roles.${role}.wins`]: win,
				[`roles.${role}.matches`]: 1,
				[`items.${item0}`]: 1,
				[`items.${item1}`]: 1,
				[`items.${item2}`]: 1,
				[`items.${item3}`]: 1,
				[`items.${item4}`]: 1,
				[`items.${item5}`]: 1,
				[`items.${item6}`]: 1,
				[`runes.${doubleStyles}.${rune0}`]: 1,
				[`runes.${doubleStyles}.${rune1}`]: 1,
				[`runes.${doubleStyles}.${rune2}`]: 1,
				[`runes.${doubleStyles}.${rune3}`]: 1,
				[`runes.${doubleStyles}.${rune4}`]: 1,
				[`runes.${doubleStyles}.${rune5}`]: 1,
				[`runes.${doubleStyles}.total`]: 1
			}
		}, {upsert: true})
	}
}