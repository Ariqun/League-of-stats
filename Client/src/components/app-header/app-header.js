import React, {Component} from 'react';
import './app-header.sass';

export default class AppHeader extends Component {
	render() {
		return (
			<header>
				<div className="logo">
					<a href="/" className="home">League of Stats</a>
				</div>
	
				<div className="container">
					<div className="nav">
						<ul>
							<li>Чампидроны</li>
							<li>Предметы</li>
							<li>Статистика</li>
						</ul>
					</div>
	
					<div className="search">
						<form onSubmit={this.props.call}>
							<input type="text" placeholder="Имя призывателя" value={this.props.name} onChange={this.props.setName}/>
	
							<select value={this.props.region} onChange={this.props.setRegion}>
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
	
							<button type="submit">
								<img src="/assets/icons/search.png" alt="search"/>
							</button>
						</form>
					</div>
				</div>
			</header>
		)
	}
}