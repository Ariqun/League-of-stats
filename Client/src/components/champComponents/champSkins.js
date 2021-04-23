import React, {Component} from 'react';

export default class ChampSkins extends Component {
	state = {
		show: false,
		id: '',
		num: ''
	}

	showModal = (id, num) => {
		this.setState({
			show: true,
			id: id,
			num: num
		})
	}

	hideModal = () => {
		this.setState({show: false})
	}

	createModal = (id, num) => {
		return(

			<div className="skin_modal" onClick={this.hideModal}>
				<div className="modal_wrapper">
					<span className="modal_exit"></span>
					<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${num}.jpg`} alt={`${id}_${num}`}/>
				</div>
			</div>
		)
	}

	createSkinList = (id, skins) => {
		const cards = skins.map(skin => {
			const {num, name} = skin

			if (num === 0) {
				return null
			}

			return(
				<div className="skin_card col-xl-3 col-lg-4 col-sm-6" onClick={() => this.showModal(id, num)} key={num}>
					<div className="wrapper_for_horizontal_borders">
						<div className="wrapper_for_vertical_borders">
							<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_${num}.jpg`} alt={name}/>
							<span className="skin_title">{name}</span>
						</div>
					</div>
				</div>
			)
		})

		return cards
	}

	render() {
		const {id, skins} = this.props.champ
		const {num} = this.state
		const content = this.createSkinList(id, skins)
		let modal = ''

		this.state.show ? modal = this.createModal(id, num) : modal = ''

		return(
			<div className="skins">
				{content}
				{modal}
			</div>
		)
	}
}