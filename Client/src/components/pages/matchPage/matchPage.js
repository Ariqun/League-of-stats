import React, {useState, useEffect} from 'react';

import CreateMatchInfo from '../../sumComponents/matches/createMatchInfo';
import Loading from '../../loading/loading';

import './matchPage.sass';

function MatchPage({region, matchId, version}) {
	const [info, setInfo] = useState({});
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getInfo = async () => {
			const mini = false;
			const res = await CreateMatchInfo(matchId, version, mini);

			setInfo(info => ({...info, ...res}));
			setLoading(false);
		}
		getInfo();
	}, []);

	const createTeamScoreBlock = (id) => {
		let team = {};

		for (let elem in info) {
			if (typeof info[elem] === 'object' && info[elem].teamstats.teamId === id) {
				team = info[elem].teamstats;
			}
		}

		return(
			<>
				<div className="result">
					<div className={team.win ? 'win' : 'defeat'}>{team.win ? 'Победа' : 'Поражение'}</div>
					<div className="score">
						<span className="kills">{team.kills}</span>
						<span> / </span>
						<span className="deaths">{team.deaths}</span>
						<span> / </span>
						<span className="assists">{team.assists}</span>
					</div>
				</div>

				<div className="objects">
					{Object.keys(team.objectives).map(obj => {
						if (obj === 'champion') return null;

						return(
							<div className={`object ${obj}`} key={obj}>
								<div className="obj_icon"></div>
								<span className="amount">{team.objectives[obj].kills}</span>
							</div>
						)
					})}
				</div>
			</>
		)
	}

	const createRank = (rankedInfo) => {
		const ruObj = {iron: 'Железо', bronze: 'Бронза', silver: 'Серебро', gold: 'Золото', platinum: 'Платина', diamond: 'Алмаз', master: 'Мастер', grandmaster: 'Грандмастер', challenger: 'Претендент'};

		const {tier, rank} = rankedInfo;

		return(<span className="rank">{ruObj[tier.toLowerCase()]} {rank}</span>);
	}

	const createPlayerBlock = (team) => {
		const result = team.players.map(player => {
			const {championName, spells, mainRunes, kills, deaths, assists, totalMinionsKilled, farmPerMin, totalTeamKills, visionScore, visionPerMin, goldEarned, goldPerMin, items, summonerName, rankedInfo} = player;

			return(
				<div className="player" key={championName}>
					<div className="player_settings">
						<div className="champion_icon">
							<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} alt={`${championName}_icon`}/>
						</div>
						<div className="spells">
							<div className="sum_spells">
								{spells.map(spell => {return(<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell}.png`} alt={`${spell}_icon`} key={spell}/>)})}
							</div>
							<div className="runes">
								{mainRunes.map(rune => {return <img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune}`} alt={`${rune}_icon`} key={rune}/>})}
							</div>
						</div>
					</div>

					<div className="player_name">
						<span className="name">{summonerName}</span>
						{createRank(rankedInfo)}
					</div>

					<div className="player_stats">
						<div className="kda_score">
							<span className="kills">{kills}</span>
							<span> / </span>
							<span className="deaths">{deaths}</span>
							<span> / </span>
							<span className="assists">{assists} </span>
							<span className="kda_ratio">&ensp;({((kills + assists) / deaths).toFixed(2)})</span>
						</div>

						<div className="other_score">
							<div className="wrapper_block_left">
								<div className="farm_score">
									<span className="farm">{totalMinionsKilled} </span>
									<span className="per_min">({farmPerMin})</span>
									<span> CS</span>
								</div>
								<div className="gold_score">
									<span className="gold">Золото: {(goldEarned / 1000).toFixed(1)}k </span>
									<span className="per_min">({Math.floor(goldPerMin)})</span>
								</div>
							</div>

							<div className="wrapper_block_right">
								<div className="vision_score">
									<span className="vision">Обзор: {visionScore} </span>
									<span className="per_min">({visionPerMin})</span>
								</div>

								<span className="kill_part">{((kills + assists) * 100 / totalTeamKills).toFixed()}% уч. в уб.</span>
							</div>
						</div>
					</div>

					<div className="player_items">
						{items}
					</div>
				</div>
			)
		})

		return result;
	}

	const render = () => {
		if (isLoading) return <Loading/>;

		const leftTeam = createPlayerBlock(info.leftTeam);
		const rightTeam = createPlayerBlock(info.rightTeam);
		console.log(info);

		return(
			<div className="match_page">
				<div className="container">
					<div className="full_match">
						<div className="table_result">
							<div className="table_head">
								<div className="left_team">
									{createTeamScoreBlock(100)}
								</div>

								<div className="match_type">
									<div className="date">
										<span className="time_date">{info.date}</span>
										<span className="duration">({info.duration})</span>
									</div>
									<span className="type">{info.type}</span>
								</div>

								<div className="right_team">
									{createTeamScoreBlock(200)}
								</div>
							</div>

							<div className="table_body">
								<div className="left_team">
									{leftTeam}
								</div>

								<div className="right_team">
									{rightTeam}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	return render();
}

export default MatchPage;