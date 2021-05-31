import React from 'react';
import {connect} from 'react-redux';

import runeTooltip from '../../../../components/tooltips/runeTooltip';

const PlayerRunes = ({perks, runes}) => {
	const stylePrimId = perks.styles[0].style;
	const styleSubId = perks.styles[1].style;
	const stylePrim = runes.find(rune => rune.id === stylePrimId);
	const styleSub = runes.find(rune => rune.id === styleSubId);

	const runePrim = stylePrim.slots[0].runes[0];
	const tooltip = runeTooltip(runePrim);
	return(
		<div className="runes">
			<img 
				className="rune prim"
				src={`https://ddragon.leagueoflegends.com/cdn/img/${runePrim.icon}`} 
				data-tip={tooltip} 
				data-for="tooltip"
				alt={`${runePrim.name}_icon`}
			/>
			<img className="rune sub" src={`https://ddragon.leagueoflegends.com/cdn/img/${styleSub.icon}`} alt={`${styleSub.name}_icon`} key={styleSub.id}/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {runes: state.runes};
}

export default connect(mapStateToProps)(PlayerRunes);