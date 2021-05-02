import React, {useState, useEffect} from 'react';

import MatchInfo from './components/matchInfo';
import Loading from '../../components/loading';
import TableResult from './components/tableResult';
import Graphs from './components/graphs';
import ChampStatistics from './components/champStatistics';

const Match = ({region, matchId, version}) => {
	const [info, setInfo] = useState({});
	const [isLoading, setLoading] = useState(true);
	
	useEffect(() => {
		const getInfo = async () => {
			const mini = false;
			const res = await MatchInfo(matchId, version, mini);

			setInfo(info => ({...info, ...res}));
			setLoading(false);
		}
		getInfo();
	}, []);

	if (isLoading) return <Loading/>;

	return(
		<div className="match_page">
			<div className="container">
				<TableResult info={info} version={version} region={region}/>
				<Graphs info={info} version={version}/>
				<ChampStatistics info={info} version={version}/>
			</div>
		</div>
	);
}

export default Match;