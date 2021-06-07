import React from 'react';
import ReactTooltip from 'react-tooltip';

import RunesBlock from './components/runesBlock';

const Runes = () => {
	return(
		<div className="runes_page">
			<div className="container-xxl">
				<div className="runes">
					<RunesBlock />
				</div>
			</div>

			<ReactTooltip id="tooltip" html/>
		</div>
	)
}

export default Runes;