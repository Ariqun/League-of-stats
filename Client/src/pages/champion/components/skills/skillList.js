import React from 'react';

const SkillList = ({spells, version, changeCurrentSkill}) => {
	const content = spells.map((spell, i) => {
		const {id, name, image} = spell

		return (
			<div className="skill" onClick={() => changeCurrentSkill(id)} key={id}>
				<div className="wrapper_for_horizontal_borders">
					<div className="wrapper_for_vertical_borders">
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${image.full}`} alt={name}></img>
					</div>
				</div>
			</div>
		)
	})

	return(content)
}

export default SkillList;