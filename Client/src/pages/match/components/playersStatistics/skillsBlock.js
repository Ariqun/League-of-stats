import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import DragonData from '../../../../services/dragonData';
import checkLanguage from '../../../../utils/languages/checkLanguage';
import skillTooltip from '../../../../components/tooltips/skillTooltip';
import langForDB from '../../../../utils/languages/langForDB';
import {modifyChampName} from '../../../../utils/actionsWithStr/modifyChampName';
import {LoadingBlock} from '../../../../components/loading';

const SkillsBlock = ({info, tab, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champion, setChampion] = useState({});
	const skillIds = [1, 2, 3, 4];
	const [t] = useTranslation();
	
	useEffect(() => {
		const getChamp = async () => {
			const {participants} = info;
			const player = participants.find(item => item.participantId === tab);
			const champName = modifyChampName(player.championName);
			const lang = checkLanguage();

			const dd = new DragonData(version, langForDB(lang));
			const res = await dd.getChampion(champName);
			
			setChampion(res);
			changeLoading(false);
		}
		getChamp();
	}, [info, tab, version])
	
	if (isLoading) return <LoadingBlock />;
	
	const createRow = (skillId) => {
		const skills = info.timeline[0][tab].lvlUp;
		const icon = champion.spells[skillId - 1].image.full;
		const tooltip = skillTooltip(champion.spells[skillId - 1], version);

		const result = skills.map((sk, i) => {
			if (sk.skill === skillId) {
				return <td className="cell skill" key={`${sk.time}_${i}`}>{i + 1}</td>
			}

			return <td className="cell empty" key={`${sk.time}_${i}`}></td>
		})

		return(
			<tr key={skillId}>
				<td data-tip={tooltip} data-for="tooltip">
					<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${icon}`} alt="skill"/>
				</td>
				{result}
			</tr>
		);
	}

	const content = skillIds.map(id => createRow(id));

	return(
		<div className="skill_table">
			<div className="title">{t('skillOrders')}</div>
			<table>
				<tbody>
					{content}
				</tbody>
			</table>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(SkillsBlock);