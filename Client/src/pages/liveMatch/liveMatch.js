import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import MatchData from './components/matchData';
import TeamBlock from './components/teamBlock';
import matchTypesRU from '../../components/languages/russian/matchTypesRU';
import {LoadingPage} from '../../components/loading';

import RiotAPI from '../../services/riotAPI';

const LiveMatch = ({region, name, matchTypes}) => {
	const [isLoading, changeLoading] = useState(true);
	const [live, setLive] = useState({});
	const riotAPI = new RiotAPI();

	useEffect(() => {
		const getLiveInfo = async () => {
			const summoner = await riotAPI.getSummoner(region, name);

			const sumId = summoner.tech.sumID;
			const liveMatch = await riotAPI.getLiveMatch(sumId, region);

			setLive(liveMatch);
			changeLoading(false);
		}
		getLiveInfo();
	}, [])

	if (isLoading) return <LoadingPage />

	if (Object.keys(live).length === 0) {
		return(
			<div className="live_page">
				<div className="container">
					<div className="not_in_game">
						<div><span className="name">{name}</span> сейчас не в игре</div>
						<button className="profile">
							<Link to={`/summoner/${region}/${name}`}>
								Профиль <span className="name">{name}</span>
							</Link>
						</button>
					</div>
				</div>
			</div>
		)
	}

	const {gameQueueConfigId, gameStartTime, participants} = live;
	const leftTeam = participants.filter(player => player.teamId === 100);
	const rightTeam = participants.filter(player => player.teamId === 200);

	const ruMatchTypes = matchTypesRU();
	const matchTypesArr = Object.values(matchTypes);
	const matchTypeInfo = matchTypesArr.find(type => type.queueId === gameQueueConfigId);
	const matchTypeName = ruMatchTypes[matchTypeInfo.description];
	
	return(
		<div className="live_page">
			<div className="container">
				<MatchData matchType={matchTypeName} startTime={gameStartTime}/>
				<TeamBlock team={leftTeam} type="left"/>
				<TeamBlock team={rightTeam} type="right"/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {matchTypes: state.matchTypes}
}

export default connect(mapStateToProps)(LiveMatch);