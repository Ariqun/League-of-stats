import React, {useState, useEffect} from 'react';

import Loading from '../loading';

import DragonData from '../../services/dragonData';

import './index.sass';

const Runes = ({ids, version}) => {
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

	const result = runes.map(rune => {
		const prim = ids.primaryStyle.style;
		const sub = ids.subStyle.style;
		const perks = [...ids.primaryStyle.perks, ...ids.subStyle.perks];

		if (rune.id !== prim && rune.id !== sub) return null;
		
		const res = rune.slots.map((slot, i) => {
			const subRes = slot.runes.map(item => {
				return (
					<div className={perks.includes(item.id) ? "rune active" : "rune"} key={item.id}>
						<img src={`https://ddragon.leagueoflegends.com/cdn/img/${item.icon}`} alt={`icon_${item.id}`}/>
					</div>
				)
			})

			return(
				<div className="rune_row" key={i}>
					{subRes}
				</div>
			);
		})

		return(
			<div className={rune.id === prim ? "style_block prim" : "style_block sub"} key={rune.id}>
				<div className="style">
					<img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune}/>
				</div>
				{res}
			</div>
		)
	});

	return(
		<div className="runes_comp">
			{result}
		</div>
	)
}

export default Runes;