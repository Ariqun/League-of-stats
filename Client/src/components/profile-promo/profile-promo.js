import React from 'react';
import './profile-promo.css'

const Promo = () => {
	return (
		<div className="promo">
			<div className="banner">
				<div className="icon">
					<img src="http://ddragon.leagueoflegends.com/cdn/11.7.1/img/profileicon/26.png" alt="icon"/>
				</div>

				<div className="name_and_lvl">
					<div className="name">
						<span className="region"></span>
					</div>

					<div className="lvl">Уровень</div>
				</div>
			</div>
		</div>
	)
}

export default Promo