import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import objectOfTitles from './objectOfTitles';
import {checkBigNum} from '../../../../components/actionsWithNums/checkNums';
import {modifyChampName} from '../../../../components/actionsWithStr/modifyChampName';

const Table = ({info, version}) => {
	const [currentColumn, changeCurrentColumn] = useState(0);
	const [currentRow, changeCurrentRow] = useState('largestKillingSpree');
	const [t] = useTranslation();

	const {participants} = info;
	const objOfTitles = objectOfTitles();
	const titles = ['fight', 'dmg', 'healAndShields', 'economics', 'vision', 'other'];

	const createBlock = (arr, title) => {
		const result = arr.map(item  => {
			const max = Math.max(...participants.map(player => {return player[item]}));

			const res = participants.map((player, i) => {
				let content = checkBigNum(player[item]);
				let className = '';

				if (player[item] === true) content = '🗸';
				if (currentColumn === i) className = 'current';
				if ((player[item] === max && max !== 0) || player[item] === true) className += ' max';
				
				return (
					<td className={className} key={player.participantId}>
						{content}
					</td>
				)
			})
	
			return(
				<tr onClick={() => changeCurrentRow(item)} className={currentRow === item ? "current_row" : ''} key={item}>
					<td className="title">{t(item)}</td>
					{res}
				</tr>
			)
		});

		return (
			<React.Fragment key={title}>
				<tr><td className="block_title">{t(title)}</td></tr>
				{result}
			</React.Fragment>
		);
	}
	
	const champsBlock = participants.map((player, i) => {
		const champName = modifyChampName(player.championName);

		return(
			<td onClick={() => changeCurrentColumn(i)} key={champName}>
				<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`} alt={`${champName}_icon`}/>
			</td>
		)
	});
	
	const content = titles.map(title => createBlock(objOfTitles[title], title));

	return(
		<div className="statistics_table">
			<table>
				<tbody>
					<tr className="champ_icons"><td></td>{champsBlock}</tr>
					{content}
					<tr className="champ_icons"><td></td>{champsBlock}</tr>
				</tbody>
			</table>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(Table);