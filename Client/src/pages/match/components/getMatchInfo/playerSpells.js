import React from 'react';
import {connect} from 'react-redux';
import spellTooltip from '../../../../components/tooltips/spellTooltip';

const PlayerSpells = ({firstId, secondId, version, spells}) => {
	const spellIds = [firstId, secondId];

	const content = spellIds.map(id => {
		const spellsArray = Object.values(spells);
		const spell = spellsArray.find(spell => +spell.key === id);
		const {name, image} = spell;
		const tooltip = spellTooltip(spell, version);

		return(
			<img 
				src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${image.full}`}
				data-tip={tooltip} 
				data-for="tooltip"
				alt={`${name}_icon`}
				key={id}
			/>
		)
	})

	return(
		<div className="spells">
			{content}
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