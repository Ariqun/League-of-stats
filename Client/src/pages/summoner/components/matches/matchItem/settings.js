import React from 'react';
import {connect} from 'react-redux';

import PlayerSpells from '../../../../match/components/getMatchInfo/playerSpells';
import PlayerRunes from '../../../../match/components/getMatchInfo/playerRunes';
import {modifyChampName} from '../../../../../components/manipulationsWithStr/modifyChampName';

const Settings = ({player, version}) => {
	const {championName, summoner1Id, summoner2Id, perks} = player;
	const champName = modifyChampName(championName);
	
	return(
		<div className="match_settings">
			<div className="champion_icon">
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} alt={`${champName}_icon`}/>
			</div>
			<div className="runes_and_spells">
				<PlayerSpells firstId={summoner1Id} secondId={summoner2Id}/>
				<PlayerRunes perks={perks}/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Settings);