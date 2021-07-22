import React from 'react';

const RolesBlock = ({roles}) => {
	const content = roles.map(role => {
		return(
			<div className="role" key={role}>
				<img src={`${process.env.PUBLIC_URL}/assets/icons/roles/${role}.png`} alt={role} title={role} />
			</div>
		);
	});

	return(
		<div className="roles">
			{content}
		</div>
	);
}

export default RolesBlock;