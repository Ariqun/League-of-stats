import React from 'react';
import ReactTooltip from 'react-tooltip';

const RunesBlock = ({runes}) => {
	const result = runes.map(rune => {
		const res = rune.slots.map((slot, i) => {
			const subRes = slot.runes.map(item => {
				return (
					<div className={"rune_item"} data-tip={item.longDesc} data-for="rune_tooltip" key={item.id}>
						<img src={`https://ddragon.leagueoflegends.com/cdn/img/${item.icon}`} alt={`icon_${item.id}`}/>
					</div>
				)
			})

			return(
				<div className="rune_row" key={i}>
					{subRes}
				</div>
			)
		})

		return(
			<div className={"style_block"} key={rune.id}>
				<div className="style">
					<img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune}/>
				</div>
				<div className="style_title">{rune.name}</div>
				{res}
			</div>
		)
	});

	return(
		<>
			{result}
			<ReactTooltip id="rune_tooltip" html/>
		</>
	);
}

export default RunesBlock;