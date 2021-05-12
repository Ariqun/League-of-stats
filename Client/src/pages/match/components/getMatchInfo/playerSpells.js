import React from 'react';
import {connect} from 'react-redux';

const PlayerSpells = ({firstId, secondId, version, spells}) => {
	const spellsArr = Object.values(spells);
	const spellOne = spellsArr.find(spell => +spell.key === firstId);
	const spellTwo = spellsArr.find(spell => +spell.key === secondId);

	return(
		<div className="sum_spells">
			<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellOne.image.full}`} alt={`${spellOne.name}_icon`} key={spellOne.key}/>
			<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellTwo.image.full}`} alt={`${spellTwo.name}_icon`} key={spellTwo.key}/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		version: state.version,
		spells: state.spells
	}
}

export default connect(mapStateToProps)(PlayerSpells);