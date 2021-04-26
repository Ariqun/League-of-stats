import React, {useState, useEffect} from 'react';

import CreateMatchInfo from '../../matchComponents/createMatchInfo';
import PlayerBlock from '../../matchComponents/playerBlock';
import Canvas from '../../matchComponents/canvas';
import Loading from '../../loading/loading';

import './matchPage.sass';
import TeamScoreBlock from '../../matchComponents/teamScoreBlock';

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

	const createInfoForCanvas = (team) => {
		let res = [];
		
		for (let elem of team) {
			const {totalDamageDealtToChampions, magicDamageDealtToChampions, physicalDamageDealtToChampions, trueDamageDealtToChampions} = elem;
			const {totalHealsOnTeammates, totalDamageShieldedOnTeammates} = elem;
			let player = {};

			player.champ = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${elem.championName}.png`;
			player.dmg = {
				total: totalDamageDealtToChampions,
				physical: physicalDamageDealtToChampions,
				magic: magicDamageDealtToChampions,
				trueDmg: trueDamageDealtToChampions
			};
			player.heal = {
				total: totalHealsOnTeammates + totalDamageShieldedOnTeammates,
				restore: totalHealsOnTeammates,
				absorb: totalDamageShieldedOnTeammates
			};

			res.push(player);
		}
		return res;
	}

	const render = () => {
		if (isLoading) return <Loading/>;

		const leftTeamInfoForCanvas = createInfoForCanvas(info.leftTeam.players);
		const rightTeamInfoForCanvas = createInfoForCanvas(info.rightTeam.players);

		return(
			<div className="match_page">
				<div className="container">
					<div className="table_result">
						<div className="table_head">
							<div className="left_team col-4">
								<TeamScoreBlock info={info} id={100}/>
							</div>

							<div className="match_type col-4">
								<div className="date">
									<span className="time_date">{info.date}</span>
									<span className="duration">({info.duration})</span>
								</div>
								<span className="type">{info.type}</span>
							</div>

							<div className="right_team col-4">
								<TeamScoreBlock info={info} id={200}/>
							</div>
						</div>

						<div className="table_body">
							<div className="left_team">
								<PlayerBlock team={info.leftTeam} version={version} region={region}/>
							</div>

							<div className="right_team">
								<PlayerBlock team={info.rightTeam} version={version} region={region}/>
							</div>
						</div>
					</div>

					<div className="graphs">
						<div className="graph graph_damage">
							<span className="graph_title">Урон по чемпионам</span>
							<Canvas leftTeam={leftTeamInfoForCanvas} rightTeam={rightTeamInfoForCanvas} option="dmg"/>
						</div>

						<div className="graph graph_heal">
							<span className="graph_title">Лечение и щиты на союзников</span>
							<Canvas leftTeam={leftTeamInfoForCanvas} rightTeam={rightTeamInfoForCanvas} option="heal"/>
						</div>
					</div>

					<div className="champion_statistic">
						<div className="tabs">
							<div className="left_team">
								{info.leftTeam.players.map((player, i) => {
									const {championName} = player;
									return (
										<div className="tab" key={`${championName}_${i}`}>
											<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} 
													alt={`${championName}_icon`}
											/>
										</div>
									)
								})}
							</div>

							<div className="table">

							</div>

							<div className="right_team">
								{info.rightTeam.players.map((player, i) => {
									const {championName} = player;
									return (
										<div className="tab" key={`${championName}_${i}`}>
											<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`} 
													alt={`${championName}_icon`}
											/>
										</div>
									)
								})}
							</div>
						</div>

						<div className="content">

						</div>
					</div>
				</div>
			</div>
		)
	}
	
	return render();
}

export default MatchPage;