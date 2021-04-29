import React, {useEffect, useState} from 'react';

import CircleCanvas from './circleCanvas';
import Loading from '../loading/loading';

import DataBase from '../services/dataBase';

function ChampStats({champ}) {
	const [champStats, setChampStats] = useState({});
	const [loading, changeLoading] = useState(true);
	const db = new DataBase();

	useEffect(() => {
		const getInfo = async () => {
			const res = await db.getChampionStats(champ.key);
			setChampStats(res);
			changeLoading(false);
		}
		getInfo();
	}, [])

	const checkNum = (num) => {
		console.log(num)
		if (num === '0.0' || isNaN(num)) {
			return 0;
		}

		return num;
	}

	const positionBlock = () => {
		const positions = ['top', 'jungle', 'middle', 'adc', 'support'];
		const positionsRu = {top: 'Топ', jungle: 'Лес', middle: 'Мид', adc: 'Бот', support: 'Поддержка'};
		const {roles, matches} = champStats;

		const result = positions.map(item => {
			let matchesAtPos = 0, winsAtPos = 0;

			for (let key in roles) {
				if (key === item) {
					if (roles[key][0]) {
						matchesAtPos = roles[key][0].matches;
						winsAtPos = roles[key][0].wins;
					} else {
						matchesAtPos = 0;
						winsAtPos = 0;
					}
					
				}
			}

			const popPercent = checkNum((matchesAtPos * 100 / matches).toFixed(1));
			const winPercent = checkNum((winsAtPos * 100 / matchesAtPos).toFixed(1));

			return (
				<tr className={`position ${item}`} key={item}>
					<td className="position_type">
						<img src={process.env.PUBLIC_URL + `/assets/icons/positions/${item}.png`} alt={`${item}_icon`}/>
						<span className="position_name">{positionsRu[item]}</span>
					</td>

					<td className="popularity">
						<progress max="100" value={popPercent}/>
						<span className="value">{popPercent}%</span>
					</td>

					<td className="winrate">
						<progress max="100" value={winPercent}/>
						<span className="value">{winPercent}%</span>
					</td>
				</tr>
			)
		})

		return result;
	}

	const render = () => {
		if (loading) return <Loading/>

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

				<table className="positions">
					<tbody>
						<tr className="head">
							<th>Позиция</th>
							<th>Популярность</th>
							<th>Винрейт</th>
						</tr>
						{positionBlock()}
					</tbody>
				</table>
			</div>
		)
	}

	return render();
}

export default ChampStats;