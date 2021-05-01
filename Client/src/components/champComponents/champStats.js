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
		if (num === '0.0' || isNaN(num)) {
			return 0;
		}

		return num;
	}

	const mainStats = () => {
		const {wins, matches, totalMatches, bans} = champStats;

		return(
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
		)
	}

	const positions = () => {
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
			);
		});

		return (
			<table className="positions">
				<tbody>
					<tr className="head">
						<th>Позиция</th>
						<th>Популярность</th>
						<th>Винрейт</th>
					</tr>
					{result}
				</tbody>
			</table>
		);
	}

	const average = () => {
		const {matches, creeps, gold, kda, dmg, combo} = champStats;
		const avgCreeps = checkNum((creeps / matches).toFixed(1));
		const avgGold = checkNum((gold / matches / 1000).toFixed(3));
		const avgKills = checkNum((kda.kills / matches).toFixed(1));
		const avgDeaths = checkNum((kda.deaths / matches).toFixed(1));
		const avgAssists = checkNum((kda.assists / matches).toFixed(1));
		const avgKDARatio = checkNum(((+avgKills + +avgAssists) / +avgDeaths).toFixed(1));
		const avgDMG = checkNum(((dmg.physical + dmg.magic + dmg.trueDmg) / matches / 1000).toFixed(3) );
		const avgDouble = checkNum((combo.double / matches).toFixed(4));
		const avgTriple = checkNum((combo.triple / matches).toFixed(4));
		const avgQuadro = checkNum((combo.quadro / matches).toFixed(4));
		const avgPenta = checkNum((combo.penta / matches).toFixed(4));

		return(
			<div className="average">
				<div className="avg_title">В среднем за игру</div>

				<div className="avg_wrapper">
					<div className="avg_stat kda col-6">
						<span className="title">KDA</span>
						<div className="value">
							<span className="kills">{avgKills}</span>
							<span> / </span>
							<span className="deaths">{avgDeaths}</span>
							<span> / </span>
							<span className="assists">{avgAssists}</span>
							<span className="ratio"> ({avgKDARatio})</span>
						</div>
					</div>

					<div className="avg_stat creeps col-6">
						<span className="title">Крипы</span>
						<span className="value">{avgCreeps}</span>
					</div>

					<div className="avg_stat dmg col-6">
						<span className="title">Урон</span>
						<span className="value">{avgDMG}</span>
					</div>

					<div className="avg_stat gold col-6">
						<span className="title">Золото</span>
						<span className="value">{avgGold}</span>
					</div>
				</div>

				<div className="avg_combo">
					<div className="avg_stat penta col-3">
						<span className="title">Пентакиллы</span>
						<span className="value">{avgPenta}</span>
					</div>

					<div className="avg_stat qaudro col-3">
						<span className="title">Квадракиллы</span>
						<span className="value">{avgQuadro}</span>
					</div>

					<div className="avg_stat triple col-3">
						<span className="title">Триплкиллы</span>
						<span className="value">{avgTriple}</span>
					</div>

					<div className="avg_stat double col-3">
						<span className="title">Даблкиллы</span>
						<span className="value">{avgDouble}</span>
					</div>
				</div>
			</div>
		)
	}

	const render = () => {
		if (loading) return <Loading/>
		console.log(champStats)

		return (
			<div className="stats">
				{mainStats()}

				<div className="posAndAvg">
					{positions()}
					{average()}
				</div>
			</div>
		)
	}

	return render();
}

export default ChampStats;