import React from 'react';
import {connect} from 'react-redux';

import Rating from './rating';

const SumBanner = ({lvl, iconID, ranked, version}) => {
	let solo = null, flex = null;
	
	if (ranked) {
		solo = ranked.find(item => item.queueType === 'RANKED_SOLO_5x5');
		flex = ranked.find(item => item.queueType === 'RANKED_FLEX_SR');
	}
	
	return(
		<div className="sum_banner">
			<div className="icon">
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconID}.png`} alt="icon"/>
			</div>

			<div className="lvl">{lvl}</div>

			<div className="side_block">
				<Rating ranked={solo} type="Одиночная" />
				<Rating ranked={flex} type="Флекс" />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(SumBanner);