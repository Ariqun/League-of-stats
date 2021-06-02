import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import RiotAPI from '../../../../services/riotAPI';

const CheckLiveMatch = ({name, region = 'ru', sumId}) => {
	const [live, setLive] = useState({});
	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getLiveInfo = async () => {
			const res = await riotAPI.getLiveMatch(sumId, region);
			setLive(res);
		}
		getLiveInfo();
	}, [])

	if (!live || Object.keys(live).length === 0) return null;

	return(
		<Link to={`/live/${region.toLowerCase()}/${name}`} className="live" target="_blank">
			<span>Сейчас в игре</span>
		</Link>
	);
}

export default CheckLiveMatch;