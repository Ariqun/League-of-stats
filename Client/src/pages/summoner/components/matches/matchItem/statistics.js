import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import MatchResult from '../../../../match/components/matchResult';
import totalTeamKills from '../../../../match/components/getMatchInfo/totalTeamKills';
import PlayerKDA from '../../../../match/components/playerKDA';
import {scorePerMin} from '../../../../../components/manipulationsWithNums/scorePerTime';
import {calcRatio} from '../../../../../components/manipulationsWithNums/calcRatio';
import matchTypesRU from '../../../../../components/languages/russian/matchTypesRU';
import {transformDate, transformMS} from '../../../../../components/manipulationsWithNums/transformTime';

const Statistics = ({player, info, matchId, matchTypes}) => {
	const {platformId, queueId, teams, gameStartTimestamp, gameDuration} = info;
	const {kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled, teamId} = player;
	const {win, gameEndedInEarlySurrender, gameEndedInSurrender} = player;
	const objRU = matchTypesRU();

	const isSurrender = !win && (gameEndedInEarlySurrender || gameEndedInSurrender);
	const matchType = matchTypes.find(type => type.queueId === queueId);
	const matchTypeRU = objRU[matchType.description];
	const duration = transformMS(gameDuration, 'digits');
	const startDate = transformDate(gameStartTimestamp, true);
	const teamKills = totalTeamKills(teams, teamId);
	const farm = totalMinionsKilled + neutralMinionsKilled;
	const avgKillPart = calcRatio(((kills + assists) * 100), teamKills);
	const farmPerMin = scorePerMin(farm, gameDuration, 1);
	
	return(
		<div className="match_stats">
			<Link to={`/match/${platformId.toLowerCase()}/${matchId}`} className="show_full_match" title="Показать матч">
				<div className="time">
					<span className="date">{startDate}</span>
					<span className="duration">&ensp;({duration})</span>
				</div>

				<div className="stats_wrapper">
					<div className="match_result">
						<MatchResult teams={teams} teamId={teamId} duration={gameDuration} surrender={isSurrender}/>
						<span className="match_type">{matchTypeRU}</span>
					</div>

					<div className="champion_stats">
						<PlayerKDA kills={kills} deaths={deaths} assists={assists}/>

						<div className="farm_score">
							<span className="farm">{farm} </span>
							<span className="farm_per_min">({farmPerMin})</span>
							<span> CS</span>
						</div>
						<span className="kill_part">{avgKillPart}% уч. в уб.</span>
					</div>
				</div>
			</Link>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {matchTypes: state.matchTypes}
}

export default connect(mapStateToProps)(Statistics);