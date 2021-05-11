import React from 'react';
import {connect} from 'react-redux';

const Settings = ({championName, spells, mainRunes, version}) => {
	return(
		<div className="match_settings">
			<div className="champion_icon">
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt={`${championName}_icon`}/>
			</div>
			<div className="spells">
				<div className="sum_spells">
					{spells.map(spell => {return <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png`} alt={`${spell}_icon`} key={spell}/>})}
				</div>
				<div className="runes">
					{mainRunes.map(rune => {return <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`} alt={`${rune}_icon`} key={rune}/>})}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Settings);