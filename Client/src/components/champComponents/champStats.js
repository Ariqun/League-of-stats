import React, {useEffect, useState} from 'react';

import CircleCanvas from './circleCanvas';

import DataBase from '../services/dataBase';

function ChampStats({champ}) {
	const [champStats, setChampStats] = useState({});
	const db = new DataBase();

	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getChampionStats(champ.key);
			setChampStats(res);
		}
		getInfo();
	}, [])

	const render = () => {
		const {wins, bans, matches, totalMatches} = champStats;
		console.log(champStats)

		return (
			<div className="stats">
				<div className="main_stats">
					<div className="winrate graph col-2">
						<div className="graph_title">Винрейт</div>
						<CircleCanvas value={wins} total={matches} mode='winrate'/>
					</div>

					<div className="banrate graph col-2">
						<div className="graph_title">Банрейт</div>
						<CircleCanvas value={bans} total={totalMatches} mode='banrate'/>
					</div>

					<div className="pickrate graph col-2">
						<div className="graph_title">Пикрейт</div>
						<CircleCanvas value={matches} total={totalMatches} mode='pickrate'/>
					</div>
				</div>
			</div>
		)
	}

	return render();
}

export default ChampStats;