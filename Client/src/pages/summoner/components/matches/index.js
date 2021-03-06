import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import MatchItem from './matchItem';
import SkyblueBtn from '../../../../components/buttons/skyblueBtn';

import './index.sass';

const Matches = ({matchIds, name, region}) => {
	const [matchListLenght, changeMatchListLength] = useState(10);
	const [t] = useTranslation();

	const matchList = matchIds.map((match, i) => {
		if (i >= matchListLenght) return null;
		
		return <MatchItem matchId={match} name={name} key={match} region={region} />
	});

	return(
		<div className="summoner_matches">
			{matchList}

			<div onClick={() => changeMatchListLength(matchListLenght + 10)} className="show_more_matches">
				<SkyblueBtn text={t('showMore')} />
			</div>
		</div>
	)
}

export default Matches;