import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import RiotAPI from '../../../../services/riotAPI';

const CheckLiveMatch = ({name, region = 'ru', sumId, live, liveLoaded}) => {
	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getLiveInfo = async () => {
			const res = await riotAPI.getLiveMatch('C_KAURBFJChJY_-1z2LhGI4R4XV3JagrVF3kWXQI-xCE3a6eEE-C1fYo6w', region);
			liveLoaded(res);
		}
		getLiveInfo();
	}, [])

	if (!live || Object.keys(live).length === 0) return null;

	return(
		<Link to={`/live/${region}/${name}`}>
			<div className="live">Сейчас в игре</div>
		</Link>
	);
}

const mapStateToProps = (state) => {
	return {live: state.live};
}

const mapDispatchToProps = (dispatch) => {
	return {
		liveLoaded: (live) => {
			dispatch({
				type: 'LIVE_LOADED',
				loaded: live
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckLiveMatch);