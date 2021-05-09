import React, {useState, useEffect} from 'react';
import ReactTooltip from 'react-tooltip';

import Loading from '../../../../components/loading';

import DragonData from '../../../../services/dragonData';

const SkillsBlock = ({info, tab, version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [champion, setChampion] = useState({});
	const dragonData = new DragonData(version);

	useEffect(() => {
		const getChamp = async () => {
			const players = [...info.leftTeam.players, ...info.rightTeam.players];
			let champName = '';

			for (let player of players) {
				if (player.participantId === tab) champName = player.championName;
			}

			const res = await dragonData.getChampion(champName);
			setChampion(res);
			changeLoading(false);
		}
		getChamp();
	}, [tab])
	
	const createRow = (skillId) => {
		const skills = info.timeline[tab].lvlUp;
		const icon = champion.spells[skillId - 1].image.full;
		const descr = champion.spells[skillId - 1].description;

		const result = skills.map((sk, i) => {
			if (sk.skill === skillId) {
				return <td className="cell skill" key={sk.time}>{i + 1}</td>
			}

			return <td className="cell empty" key={sk.time}></td>
		})

		return(
			<tr>
				<td data-tip={descr} data-for="skill_tooltip"><img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${icon}`} alt="skill"/></td>
				{result}
			</tr>
		);
	}

	if (isLoading) return <Loading />;

	return(
		<div className="skill_table">
			<div className="title">Порядок прокачки умений</div>
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

export default SkillsBlock;