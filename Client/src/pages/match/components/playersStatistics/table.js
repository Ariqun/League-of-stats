import React from 'react'
import {connect} from 'react-redux';

import {checkBigNum} from '../../../../components/manipulationsWithNums/checkNums';
import {fight, damage, restore, eco, vision, other} from '../../../../components/languages/russian/statisticInMatch';
import {modifyChampName} from '../../../../components/manipulationsWithStr/modifyChampName';

const Table = ({info, version}) => {
	const {participants} = info;

	const createBlock = (obj, title) => {
		const result = Object.keys(obj).map(item => {
			const max = Math.max(...participants.map(player => {return player[item]}));

			const res = participants.map(player => {
				let content = checkBigNum(player[item]);

				if (player[item] === true) content = '🗸';
				
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
	
	const champsBlock = participants.map(player => {
		const champName = modifyChampName(player.championName);

		return(
			<td key={champName}>
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} alt={`${champName}_icon`}/>
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

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Table);