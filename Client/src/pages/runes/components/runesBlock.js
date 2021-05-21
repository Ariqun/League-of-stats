import React from 'react';
import {connect} from 'react-redux';

import runeTooltip from '../../../components/tooltips/runeTooltip';

const RunesBlock = ({runes}) => {
	const result = runes.map(rune => {
		const res = rune.slots.map((slot, i) => {
			const subRes = slot.runes.map(item => {
				const tooltip = runeTooltip(item);

				return (
					<div className={"rune_item"} data-tip={tooltip} data-for="tooltip" key={item.id}>
						<img src={`https://ddragon.leagueoflegends.com/cdn/img/${item.icon}`} alt={`icon_${item.id}`}/>
					</div>
				)
			})

			return(
				<div className="rune_row" key={i}>
					{subRes}
				</div>
			)
		})

		return(
			<div className={"style_block"} key={rune.id}>
				<div className="style">
					<img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune}/>
				</div>
				<div className="style_title">{rune.name}</div>
				{res}
			</div>
		)
	});
	
	return result;
}

const mapStateToProps = (state) => {
	return {runes: state.runes};
}

export default connect(mapStateToProps)(RunesBlock);