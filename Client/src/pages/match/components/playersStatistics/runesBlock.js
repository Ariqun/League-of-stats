import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import runeTooltip from '../../../../components/tooltips/runeTooltip';

const RunesBlock = ({info, tab, runes}) => {
	const {participants} = info;
	const [t] = useTranslation();

	const createRuneIds = () => {
		const obj = {};

		for (let player of participants) {
			if (player.participantId === tab) {
				for (let style of player.perks.styles) {
					let perks = [];
	
					for (let elem of style.selections) {
						perks.push(elem.perk);
					}
	
					obj[style.description] = {
						style: style.style,
						perks: perks
					}
				}
	
				obj.stats = player.perks.statPerks;
			}
		}

		return obj;
	}
	const runeIds = createRuneIds();

	const result = runes.map(rune => {
		const prim = runeIds.primaryStyle.style;
		const sub = runeIds.subStyle.style;
		const perks = [...runeIds.primaryStyle.perks, ...runeIds.subStyle.perks];

		if (rune.id !== prim && rune.id !== sub) return null;
		
		const res = rune.slots.map((slot, i) => {
			const subRes = slot.runes.map(item => {
				const tooltip = runeTooltip(item);

				return (
					<div className={perks.includes(item.id) ? "rune active" : "rune"} data-tip={tooltip} data-for="tooltip" key={item.id}>
						<img src={`https://ddragon.leagueoflegends.com/cdn/img/${item.icon}`} alt={`icon_${item.id}`}/>
					</div>
				)
			})

			return(
				<div className="rune_row" key={i}>
					{subRes}
				</div>
			);
		})

		return(
			<div className={rune.id === prim ? "style_block prim" : "style_block sub"} key={rune.id}>
				<div className="style">
					<img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune}/>
				</div>
				{res}
			</div>
		)
	});

	return(
		<div className="runes_block">
			<div className="title">{t('runes')}</div>
			<div className="runes_wrapper">
				{result}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {runes: state.runes};
}

export default connect(mapStateToProps)(RunesBlock);