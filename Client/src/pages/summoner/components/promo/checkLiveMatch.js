import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import RiotAPI from '../../../../services/riotAPI';

const CheckLiveMatch = ({name, sumId, region = 'ru'}) => {
	const [live, setLive] = useState({});
	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getLiveInfo = async () => {
			const res = await riotAPI.getLiveMatch('a96FGdSpNrmm8MXTC66Of_eQtg-4D6YaJLtIBxa8LxMh7kRZP865CuLN-w', region);
			setLive(res);
			console.log(res);
		}
		getLiveInfo();
	}, [])

	if (Object.keys(live).length === 0) return null;
	
	return(
		<Link to={`/live/${region}/${name}`}>
			<div className="live">Сейчас в игре</div>
		</Link>
	);
}

export default CheckLiveMatch;