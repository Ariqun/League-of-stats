import React from 'react';

import './errors.sass';

const StatisticsNotFound = () => {
	return(
		<div className="data_not_found">
			<div>Статистика по ранговым и обычным играм не найдена.</div>
			<div>Поисковые отряды йордлов собраны и уже в пути!</div>
			<div>Если вы принимали участие в ранговых или обычных играх, то они обязательно что-нибудь найдут, дайте им немного времени!</div>
		</div>
	)
}

export default StatisticsNotFound;