import React from 'react';

import CircleCanvas from '../../../../components/сanvases/circleCanvas';

const MatchTypes = ({stats}) => {
	const typeBlock = (type) => {
		if (stats[type] === undefined) return <div className="no_data">Нет данных</div>
		
		const {matches, wins} = stats[type];
		const losses = matches - wins;

		return(
			<>
				<CircleCanvas primary={wins} secondary={losses} width="200" height="200"/>
				<div className="total">Всего игр: {matches}</div>
			</>
		)
	}

	return(
		<div className="match_type">
			<div className="type total">
				<div className="type_title">Ранговые и обычные</div>
				{typeBlock('total')}
			</div>

			<div className="type solo">
				<div className="type_title">Одиночные</div>
				{typeBlock('solo')}
			</div>

			<div className="type flex">
				<div className="type_title">Флекс</div>
				{typeBlock('flex')}
			</div>

			<div className="type normal">
				<div className="type_title">Обычные</div>
				{typeBlock('normal')}
			</div>
		</div>
	)
}

export default MatchTypes;