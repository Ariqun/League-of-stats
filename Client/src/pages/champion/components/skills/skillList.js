import React from 'react';
import {connect} from 'react-redux';

const SkillList = ({spells, changeCurrentSkill, version}) => {
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

const mapStateToProps = (state) => {
	return {version: state.version};
}

export default connect(mapStateToProps)(SkillList);