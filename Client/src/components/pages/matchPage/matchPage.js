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
								{team.objectives[obj].kills}
							</div>
						)
					})}
				</div>
			</>
		)
	}

	const createTable = () => {

	}

	const render = () => {
		if (isLoading) return <Loading/>;

		// const {}
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
									<span className="type">{info.type}</span>
									<div className="date">
										<span>{info.date}</span>
										<span>{info.duration}</span>
									</div>
								</div>

								<div className="right_team">
									{createTeamScoreBlock(200)}
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