import React from 'react';

const Roles = ({shownRoles, toggleVision}) => {
	const arrOfRoles = ['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank'];

	const roles = arrOfRoles.map(role => {
		const opacity = shownRoles.includes(role);

		return(
			<div onClick={() => toggleVision(role)} className={opacity ? 'role' : 'role inactive'} key={role}>
				<img src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`} 
					   alt={`Role_${role}`} 
					  title={role}>
				</img>
			</div>
		)
	})

	return (
		<div className="roles col-6 offset-3">
			{roles}
		</div>
	);
}

export default Roles;