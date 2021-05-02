import React from 'react';

const RolesBlock = ({roles}) => {
	const result = roles.map(role => {
		return(
			<div className="role" key={role}>
				<img src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`} alt={`Role_${role}`} title={role}></img>
			</div>
		)
	})

	return(
		<div className="roles">
			{result}
		</div>
	);
}

export default RolesBlock;