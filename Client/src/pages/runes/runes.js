import React from 'react';

import RunesBlock from './components/runesBlock';

const Runes = () => {
	return(
		<div className="runes_page">
			<div className="container">
				<div className="runes">
					<RunesBlock />
				</div>
			</div>
		</div>
	)
}

export default Runes;