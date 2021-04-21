import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Loading from '../../loading/loading';
import CreateMatchInfo from './createMatchInfo';

function MatchItem({version, matchId, name}) {
	const [info, setInfo] = useState({});
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getInfo = async () => {
			const mini = true;
			const res = await CreateMatchInfo(matchId, version, name, mini);
			
			setInfo(info => ({...info, ...res}));
			setLoading(false);
		}
		getInfo();
	}, []);

	const render = () => {
		if (isLoading) return <Loading/>;
		
		const {spells, runes, matchType, championName, kills, deaths, assists, platformId, startDate, duration, matchResult, totalTeamKills, totalMinionsKilled, farmPerMin, items, players} = info;

		return(
			<div className="match_item">
				<div className="inner_wrapper">
					<div className="match_settings">
						<div className="champion_icon">
							<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt={`${championName}_icon`}/>
						</div>
						<div className="spells">
							<div className="sum_spells">
								{spells.map(spell => {return <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png`} alt={`${spell}_icon`} key={spell}/>})}
							</div>
							<div className="rune">
								{runes.map(rune => {return <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`} alt={`${rune}_icon`} key={rune}/>})}
							</div>
						</div>
					</div>

					<div className="match_stats">
						<Link to={`/match/${platformId}/${matchId}`} className="show_full_match" title="Показать матч">
							<div className="time">
								<span className="date">{startDate}</span>
								<span className="duration">&ensp;({duration})</span>
							</div>

							<div className="stats_wrapper">
								<div className="match_result">
									{matchResult}
									<span className="match_type">{matchType}</span>
								</div>

								<div className="champion_stats">
									<div className="kda_score">
										<span className="kills">{kills}</span>
										<span> / </span>
										<span className="deaths">{deaths}</span>
										<span> / </span>
										<span className="assists">{assists} </span>
										<span className="kda_ratio">&ensp;({((kills + assists) / deaths).toFixed(2)})</span>
									</div>
									<div className="farm_score">
										<span className="farm">{totalMinionsKilled} </span>
										<span className="farm_per_min">({farmPerMin})</span>
										<span> CS</span>
									</div>
									<span className="kill_part">{((kills + assists) * 100 / totalTeamKills).toFixed()}% уч. в уб.</span>
								</div>
							</div>
						</Link>
					</div>

					<div className="champ_items">
						{items}
					</div>

					<div className="match_players">
						{players}
					</div>
				</div>
			</div>
		)
	}
	return render();
}

export default MatchItem;