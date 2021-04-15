import React, {Component} from 'react'

import './champGeneral.sass';

export default class ChampGeneral extends Component {

	render() {
		const {lore, stats} = this.props.info;
		const {armor, armorperlevel, attackdamage, attackdamageperlevel, attackrange, attackspeed, attackspeedperlevel, crit, critperlevel, hp, hpperlevel, hpregen, hpregenperlevel, movespeed, mp, mpperlevel, mpregen, mpregenperlevel, spellblock, spellblockperlevel} = stats;

		return(
			<div className="general">
				<div className="lore">
					<span>{lore}</span>
				</div>

				<div className="stats">
					Броня: {armor}
				</div>

			</div>
		)
	}
}