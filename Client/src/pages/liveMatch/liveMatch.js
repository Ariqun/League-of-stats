import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import MatchData from './components/matchData';
import TeamBlock from './components/teamBlock';
import SkyblueBtn from '../../components/ui/buttons/skyblueBtn';
import {LoadingPage} from '../../components/loading';

import RiotAPI from '../../services/riotAPI';

const LiveMatch = ({region, name, matchTypes}) => {
	const [isLoading, changeLoading] = useState(true);
	const [live, setLive] = useState({});
	const [t] = useTranslation();

	useEffect(() => {
		const getLiveInfo = async () => {
			const riotAPI = new RiotAPI();

			const summoner = await riotAPI.getSummoner(region, name);
			const {sumId} = summoner;

			const liveMatch = await riotAPI.getLiveMatch(sumId, region);

			setLive(liveMatch);
			changeLoading(false);
		}
		getLiveInfo();
	}, [name, region])

	if (isLoading) return <LoadingPage />;

	const content = () => {
		if (Object.keys(live).length === 0) {
			return(
				<div className="not_in_game">
					<div><span className="name">{name}</span> {t('notInGame')}</div>
					
					<Link to={`/summoner/${region}/${name}`} className="profile">
						<SkyblueBtn text={t('profile')} spanText={name}/>
					</Link>
				</div>
			)
		}
	
		const {gameQueueConfigId, gameStartTime, participants} = live;
		const leftTeam = participants.filter(player => player.teamId === 100);
		const rightTeam = participants.filter(player => player.teamId === 200);
	
		const matchTypesArr = Object.values(matchTypes);
		const matchTypeInfo = matchTypesArr.find(type => type.queueId === gameQueueConfigId);
		const matchType = t(matchTypeInfo.description);
		
		return(
			<>
				<MatchData matchType={matchType} startTime={gameStartTime}/>
				<TeamBlock team={leftTeam} type="left"/>
				<TeamBlock team={rightTeam} type="right"/>
			</>
		)
	}

	return(
		<div className="live_page">
			<div className="container-xxl">
				{content()}
			</div>
		</div>
	)
	
}

const mapStateToProps = (state) => {
	return {matchTypes: state.matchTypes}
}

export default connect(mapStateToProps)(LiveMatch);