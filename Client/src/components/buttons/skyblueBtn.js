import React from 'react';

import './btns.sass';

const SkyblueBtn = ({text, spanText = '', active}) => {
	let className = 'sky_btn';

	if (active) className = 'sky_btn active';

	const spanContent = () => {
		return <span> {spanText}</span>
	}

	return(
		<button className={className}>
			{text}
			{spanContent()}
		</button>
	)
}

export default SkyblueBtn;