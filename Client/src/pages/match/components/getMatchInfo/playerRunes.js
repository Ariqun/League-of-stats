import React from 'react';
import {connect} from 'react-redux';

const PlayerRunes = ({perks, runes}) => {
	const stylePrimId = perks.styles[0].style;
	const styleSubId = perks.styles[1].style;
	const stylePrim = runes.find(rune => rune.id === stylePrimId);
	const styleSub = runes.find(rune => rune.id === styleSubId);
	const runePrim = stylePrim.slots[0].runes[0];
	
	return(
		<div className="runes">
			<img src={`https://ddragon.leagueoflegends.com/cdn/img/${runePrim.icon}`} alt={`${runePrim.name}_icon`} key={runePrim.id}/>
			<img src={`https://ddragon.leagueoflegends.com/cdn/img/${styleSub.icon}`} alt={`${styleSub.name}_icon`} key={styleSub.id}/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {runes: state.runes};
}

export default connect(mapStateToProps)(PlayerRunes);