import React from 'react';

import Runes from '../../../../components/runes';

const RunesBlock = ({info, tab, version}) => {
	const players = [...info.leftTeam.players, ...info.rightTeam.players];
	let runes = {};

	for (let player of players) {
		if (player.participantId === tab) {
			for (let style of player.perks.styles) {
				let perks = [];

				for (let elem of style.selections) {
					perks.push(elem.perk);
				}

				runes[style.description] = {
					style: style.style,
					perks: perks
				}
			}

			runes.stats = player.perks.statPerks;
		}
	}

	return(
		<div className="runes_block">
			<div className="title">Руны</div>
			<Runes ids={runes} version={version}/>
		</div>
	)
}

export default RunesBlock;