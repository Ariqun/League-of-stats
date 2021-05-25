const champion = require('../models/champion');

module.exports = async (obj) => {
	for (let key in obj) {
		const {kills, deaths, assists, physical, magic, trueDmg, restore, shield, cs, gold, double, triple, quadra, penta} = obj[key];
		const {wins, matches, items, doubleStyles, runes} = obj[key];
		const [item0, item1, item2, item3, item4, item5, item6] = items;
		const [rune0, rune1, rune2, rune3, rune4, rune5] = runes;
		const role = (obj[key].role).toLowerCase();

		await champion.updateOne({id: key}, {
			$inc: {
				"kda.kills": kills,
				"kda.deaths": deaths,
				"kda.assists": assists,
				"dmg.physical": physical,
				"dmg.magic": magic,
				"dmg.trueDmg": trueDmg,
				"heal.restore": restore,
				"heal.shield": shield,
				"creeps": cs,
				"gold": gold,
				"combo.double": double,
				"combo.triple": triple,
				"combo.quadro": quadra,
				"combo.penta": penta,
				[`roles.${role}.wins`]: wins,
				[`roles.${role}.matches`]: matches,
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