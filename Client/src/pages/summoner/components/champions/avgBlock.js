import React from 'react';

const AvgBlock = ({type, value}) => {
	return(
		<div className="wrapper">
			<img src={`${process.env.PUBLIC_URL}/assets/icons/${type}.png`} alt={type} />
			<span className="value">{value}</span>
		</div>
	)
}

export default AvgBlock;