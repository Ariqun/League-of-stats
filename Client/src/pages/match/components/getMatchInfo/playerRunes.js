const playerRunes = (player) => {
	let runes = {prim: [], sub: [], stat: []};

	for (let style of player.styles) {
		if (style.description === 'primaryStyle') {
			for (let elem of style.selections) {
				runes.prim.push(elem.perk);
			}
		} else if (style.description === 'subStyle') {
			for (let elem of style.selections) {
				runes.sub.push(elem.perk);
			}
		}
	}

	for (let key in player.statPerks) {
		runes.stat.push(player.statPerks[key]);
	}

	return runes;
}

export default playerRunes;