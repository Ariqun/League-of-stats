import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';

import checkLanguage from '../../../../components/languages/checkLanguage';
import {modifyChampName} from '../../../../components/manipulationsWithStr/modifyChampName';
import {LoadingBlock} from '../../../../components/loading';

import DragonData from '../../../../services/dragonData';

const SkillsBlock = ({info, tab, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champion, setChampion] = useState({});

	const lang = checkLanguage();
	const dragonData = new DragonData(version, lang);

	useEffect(() => {
		const getChamp = async () => {
			const {participants} = info;
			const player = participants.find(item => item.participantId === tab);
			const champName = modifyChampName(player.championName);

			const res = await dragonData.getChampion(champName);
			setChampion(res);
			changeLoading(false);
		}
		getChamp();
	}, [tab])

	if (isLoading) return <LoadingBlock />
	
	const createRow = (skillId) => {
		const skills = info.timeline[0][tab].lvlUp;
		const icon = champion.spells[skillId - 1].image.full;
		const descr = champion.spells[skillId - 1].description;

		const result = skills.map((sk, i) => {
			if (sk.skill === skillId) {
				return <td className="cell skill" key={`${sk.time}_${i}`}>{i + 1}</td>
			}

			return <td className="cell empty" key={`${sk.time}_${i}`}></td>
		})

		return(
			<tr>
				<td data-tip={descr} data-for="skill_tooltip"><img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${icon}`} alt="skill"/></td>
				{result}
			</tr>
		);
	}

	return(
		<div className="skill_table">
			<div className="title">Прокачка умений</div>
			<table>
				<tbody>
					{createRow(1)}
					{createRow(2)}
					{createRow(3)}
					{createRow(4)}
				</tbody>
			</table>
			<ReactTooltip id="skill_tooltip" html/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(SkillsBlock);