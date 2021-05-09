import React from 'react'
import {checkBigNums} from '../../../../components/chekNums';

import {fight, damage, restore, eco, vision, other} from '../../../../components/languages/russian/statisticInMatch';

const Table = ({info, version}) => {
	const players = [...info.leftTeam.players, ...info.rightTeam.players];

	const createBlock = (obj, title) => {
		const result = Object.keys(obj).map(item => {
			const max = Math.max(...players.map(player => {return player[item]}));

			const res = players.map(player => {
				let content = checkBigNums(player[item]);

				if (player[item] === true) content = '🗸';
				console.log(player[item])
				return (
					<td className={player[item] === max || player[item] === true ? "max" : null} key={player.participantId}>
						{content}
					</td>
				)
			})
	
			return(
				<tr key={item}>
					<td className="title">{obj[item]}</td>
					{res}
				</tr>
			)
		});

		return (
			<>
				<tr><td className="block_title">{title}</td></tr>
				{result}
			</>
		);
	}
	const champsBlock = players.map(player => {
		const champ = player.championName;

		return(
			<td key={champ}>
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`} alt={`${champ}_icon`}/>
			</td>
		)
	});
	const fightBlock = createBlock(fight(), 'Бой');
	const damageBlock = createBlock(damage(), 'Урон');
	const restoreBlock = createBlock(restore(), 'Лечение и щиты');
	const ecoBlock = createBlock(eco(), 'Экономика');
	const visionBlock = createBlock(vision(), 'Обзор');
	const otherBlock = createBlock(other(), 'Остальное');

	return(
		<table className="statistics_table">
			<tbody>
				<tr className="champ_icons"><td></td>{champsBlock}</tr>
				{fightBlock}
				{damageBlock}
				{restoreBlock}
				{ecoBlock}
				{visionBlock}
				{otherBlock}
			</tbody>
		</table>
	)
}

export default Table;