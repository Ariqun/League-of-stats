import React from 'react';
import {Link} from 'react-router-dom';
import averageScore from '../../../../components/averageScore';

const Statistics = ({info, matchId}) => {
	const {kills, deaths, assists, platformId, startDate, duration, matchRes, teamKills, totalMinionsKilled, farmPerMin, matchType} = info;
	const avgRatio = averageScore((kills + assists), deaths, 2);
	const avgKillPart = averageScore(((kills + assists) * 100), teamKills);
	
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
						<span className="match_type">{matchType}</span>
					</div>

					<div className="champion_stats">
						<div className="kda_score">
							<span className="kills">{kills}</span>
							<span> / </span>
							<span className="deaths">{deaths}</span>
							<span> / </span>
							<span className="assists">{assists} </span>
							<span className="kda_ratio">&ensp;({avgRatio})</span>
						</div>
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

export default Statistics;