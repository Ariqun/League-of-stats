import React, {Component} from 'react';

export default class ChampSkills extends Component {
	state = {
		currentSkill: 'passive'
	}

	createPassive = () => {
		const {passive} = this.props.champ
		return (
			<div className="skill passive" onClick={() => this.changeCurrentSkill('passive')}>
				<img src={`http://ddragon.leagueoflegends.com/cdn/11.8.1/img/passive/${passive.image.full}`} alt={passive.name}></img>
			</div>
		)
	}

	createSkillList = () => {
		const {spells} = this.props.champ
		
		const content = spells.map((spell, i) => {
			const {id, name, image} = spell

			return (
				<div className="skill" onClick={() => this.changeCurrentSkill(id)} key={id}>
					<img src={`http://ddragon.leagueoflegends.com/cdn/11.8.1/img/spell/${image.full}`} alt={name}></img>
				</div>
			)
		})

		return(content)
	}

	changeCurrentSkill = (id) => {
		console.log(id)
		this.setState({currentSkill: id})
	}

	createSkillDescr = (skill) => {
		const {spells, passive} = this.props.champ
		let {key} = this.props.champ
		key = this.addZero(key)

		if (skill === 'passive') {
			return(
				<React.Fragment key={key}>
					<div className="text">
						<span className="skill_name">{passive.name}<span className="skill_btn">[пассивное]</span></span>
						<span className="skill_descr">{passive.description}</span>
					</div>
	
					<div className="video">
						<video src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_P1.webm`} preload="auto" autoPlay loop muted="muted"></video>
					</div>
				</React.Fragment>
			)
		}

		const content = spells.map((item, i) => {
			if (item.id === skill) {
				const btns = {0: 'Q', 1: 'W', 2: 'E', 3: 'R'}
				const {name, description} = item

				return(
					<React.Fragment key={key}>
						<div className="text">
							<span className="skill_name">{name}<span className="skill_btn">[{btns[i]}]</span></span>
							<span className="skill_descr">{description}</span>
						</div>
		
						<div className="video">
							<video src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${key}/ability_${key}_${btns[i]}1.webm`} preload="auto" autoPlay loop muted="muted"></video>
						</div>
					</React.Fragment>
				)
			}
		})

		return(content)
	}

	addZero = (num) => {
		const arr = num.split('');

		if (arr.length < 4) {
			for (let i = arr.length; i < 4; i++) {
				arr.unshift('0')
			}
		}

		return arr.join('')
	}

	render() {
		const {currentSkill} = this.state
		const passiveSkill = this.createPassive();
		const list = this.createSkillList()
		const descr = this.createSkillDescr(currentSkill)

		console.log(this.props.champ)

		return(
			<div className="skills">
				<div className="icons">
					{passiveSkill}
					{list}
				</div>

				<div className="descr">
					{descr}
				</div>
			</div>
		)
	}
}