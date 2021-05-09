import React, {useState, useEffect} from 'react';

import RunesBlock from './components/runesBlock';
import Loading from '../../components/loading';

import DragonData from '../../services/dragonData';

const Runes = ({version}) => {
	const [isLoading, changeLoading] = useState(true);
	const [runes, setRunes] = useState({});

	const dd = new DragonData(version);

	useEffect(() => {
		const getRunes = async () => {
			const res = await dd.getAllRunes();
			setRunes(res);
			changeLoading(false);
		}
		getRunes();
	}, [])

	if (isLoading) return <Loading />

	return(
		<div className="runes_page">
			<div className="container">
				<div className="runes">
					<RunesBlock runes={runes}/>
				</div>
			</div>
		</div>
	)
}

export default Runes;