import React from 'react';

import './btns.sass';

const SkyblueBtn = ({text, spanText = ''}) => {
	const spanContent = () => {
		return <span> {spanText}</span>
	}

	return(
		<button className="sky_btn">
			{text}
			{spanContent()}
		</button>
	)
}

export default SkyblueBtn;