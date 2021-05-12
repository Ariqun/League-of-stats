import React, {useState, useEffect} from 'react';

import TableResult from './components/tableResult';
import CanvasGraphs from './components/canvasGraphs';
import PlayersStatistics from './components/playersStatistics';
import Loading from '../../components/loading';

import RiotAPI from '../../services/riotAPI';

const Match = ({region, matchId}) => {
	const [info, setInfo] = useState({});
	const [isLoading, changeLoading] = useState(true);
	const riotAPI = new RiotAPI();
	
	useEffect(() => {
		const getInfo = async () => {
			const res = await riotAPI.getMatchInfo(matchId);

			setInfo(res);
			changeLoading(false);
		}
		getInfo();
	}, []);

	if (isLoading) return <Loading/>;

	return(
		<div className="match_page">
			<div className="container">
				<TableResult info={info} region={region} />
				<CanvasGraphs info={info} />
				<PlayersStatistics info={info} />
			</div>
		</div>
	);
}

export default Match;