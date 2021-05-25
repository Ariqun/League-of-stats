import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import TableResult from './components/tableResult';
import TeamGraphs from './components/teamGraphs';
import PlayersStatistics from './components/playersStatistics';
import {LoadingPage} from '../../components/loading';

import DataBase from '../../services/dataBase';

const Match = ({region, matchId}) => {
	const [info, setInfo] = useState({});
	const [isLoading, changeLoading] = useState(true);
	const db = new DataBase();

	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getMatchInfo(matchId);

			setInfo(res);
			changeLoading(false);
		}
		getInfo();
	}, []);

	if (isLoading) return <LoadingPage />

	return(
		<div className="match_page">
			<div className="container">
				<TableResult info={info} region={region} />
				<TeamGraphs info={info} />
				<PlayersStatistics info={info} />
			</div>
			
			<ReactTooltip id="tooltip" html/>
		</div>
	);
}

export default Match;