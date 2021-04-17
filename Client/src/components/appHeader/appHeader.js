import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './appHeader.sass';

export default class AppHeader extends Component {
	state = {
		name: '',
		region: 'ru'
	}

	setName = (e) => {
		this.setState({name: e.target.value});
	}

	setRegion = (e) => {
		this.setState({region: e.target.value});
	}

	render() {
		const {name, region} = this.state
		const {call} = this.props

		return (
			<div className="header">
				<div className="logo">
					<Link to='/' className="home">League of Stats</Link>
				</div>
	
				<div className="container">
					<div className="nav">
						<ul>
							<li><Link to="/">Чампидроны</Link></li>
							<li>Предметы</li>
							<li>Статистика</li>
						</ul>
					</div>
	
					<div className="search">
						<form onSubmit={() => call(name, region)}>
							<input type="text" placeholder="Имя призывателя" value={name} onChange={this.setName}/>
	
							<select value={region} onChange={this.setRegion}>
								<option value="ru">RU</option>
								<option value="euw1">EUW</option>
								<option value="eun1">EUN</option>
								<option value="br1">BR</option>
								<option value="jp1">JP</option>
								<option value="kr">KR</option>
								<option value="la1">LA1</option>
								<option value="la2">LA2</option>
								<option value="na1">NA</option>
								<option value="oc1">OC</option>
								<option value="tr1">TR</option>
							</select>
	
							<Link to={`/summoner/${region}/${name}`}>
								<button type="submit">
									<img src="/assets/icons/search.png" alt="search"/>
								</button>
							</Link>
						</form>
					</div>
				</div>
			</div>
		)
	}
}