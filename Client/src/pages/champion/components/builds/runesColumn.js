import React from 'react';
import {connect} from 'react-redux';

import runeTooltip from '../../../../components/tooltips/runeTooltip';
import {checkNanAndDoubleZero} from '../../../../utils/actionsWithNums/checkNums';
import {findPercent} from '../../../../utils/actionsWithNums/findPercent';
import RateBar from '../../../../components/progressBars/rateBar';

const RunesColumn = ({styles, perks, matches, runes}) => {
	const arrOfStyles = styles.split('_');
	const [prim, sub] = arrOfStyles;
	const {total} = perks;

	const createAndModifyArray = (slot) => {
		const result = [];
		let matchesWithThisStyles = 0;

		for (let item of slot.runes) {
			if (perks[item.id]) {
				result.push({
					id: item.id,
					count: perks[item.id]
				});

				matchesWithThisStyles += perks[item.id];
			}
		}

		result.sort((a, b) => b.count - a.count);
		result.push(matchesWithThisStyles);

		return result;
	}

	const content = runes.map(rune => {
		if (+prim !== rune.id && +sub !== rune.id) return null;

		const result = rune.slots.map((slot, i) => {
			const runesArray = createAndModifyArray(slot);

			const res = slot.runes.map(item => {
				const boolean = runesArray[0] && item.id === runesArray[0].id;
				const className = boolean ? "rune_item active" : "rune_item";

				const matchesWithThisStyles = runesArray[runesArray.length - 1];
				const percentWithThisStyles = checkNanAndDoubleZero(findPercent(perks[item.id], matchesWithThisStyles, 1));
				const tooltip = runeTooltip(item, percentWithThisStyles);

				return (
					<div className={className} data-tip={tooltip} data-for="tooltip" key={item.id}>
						<img src={`https://ddragon.leagueoflegends.com/cdn/img/${item.icon}`} alt={`icon_${item.id}`}/>
					</div>
				)
			})

			return(
				<div className="rune_row" key={i}>
					{res}
				</div>
			)
		});

		return(
			<div className={rune.id === prim ? "style_block prim" : "style_block sub"} key={rune.id}>
				<div className="style">
					<img src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} alt={rune}/>
				</div>

				<div className="style_title">{rune.name}</div>
				{result}
			</div>
		)
	})

	return(
		<div className="runes_build">
			<RateBar current={total} max={matches} pop/>

			{content}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {runes: state.runes}
}

export default connect(mapStateToProps)(RunesColumn);