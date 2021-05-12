import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import averageScore from '../../../../../components/averageScore';
import matchDuration from '../../../../match/components/getMatchInfo/matchDuration';
import matchStartDate from '../../../../match/components/getMatchInfo/matchStartDate';
import matchResult from '../../../../match/components/getMatchInfo/matchResult';
import totalTeamKills from '../../../../match/components/getMatchInfo/totalTeamKills';
import PlayerKDA from '../../../../match/components/getMatchInfo/playerKDA';
import {scorePerMin} from '../../../../../components/manipulationsWithNums/scorePerTime';

const Statistics = ({player, info, matchId, matchTypes}) => {
	const {platformId, queueId, teams, gameStartTimestamp, gameDuration} = info;
	const {kills, deaths, assists, totalMinionsKilled, teamId} = player;

	const matchType = matchTypes.find(type => type.queueId === queueId);
	const duration = matchDuration(gameDuration);
	const startDate = matchStartDate(gameStartTimestamp);
	const matchRes = matchResult(teams, teamId);
	const teamKills = totalTeamKills(teams, teamId);

	const avgKillPart = averageScore(((kills + assists) * 100), teamKills);
	const farmPerMin = scorePerMin(totalMinionsKilled, gameDuration, 1);
	
	return(
		<div className="match_stats">
			<Link to={`/match/${platformId}/${matchId}`} className="show_full_match" title="Показать матч">
				<div className="time">
					<span className="date">{startDate}</span>
					<span className="duration">&ensp;({duration})</span>
				</div>

				<div className="stats_wrapper">
					<div className="match_result">
						{matchRes}
						<span className="match_type">{matchType.description}</span>
					</div>

					<div className="champion_stats">
						<PlayerKDA kills={kills} deaths={deaths} assists={assists}/>

						<div className="farm_score">
							<span className="farm">{totalMinionsKilled} </span>
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