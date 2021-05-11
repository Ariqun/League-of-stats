import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import getMatchInfo from './components/getMatchInfo';
import Loading from '../../components/loading';
import TableResult from './components/tableResult';
import CanvasGraphs from './components/canvasGraphs';
import PlayersStatistics from './components/playersStatistics';

const Match = ({region, matchId, version}) => {
	const [info, setInfo] = useState({});
	const [isLoading, setLoading] = useState(true);
	
	useEffect(() => {
		const getInfo = async () => {
			const mini = false;
			const res = await getMatchInfo(matchId, version, mini);

			setInfo(info => ({...info, ...res}));
			setLoading(false);
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

const mapStateToProps = (state) => {
	return {version: state.version}
}

export default connect(mapStateToProps)(Match);