import React from 'react';
import { connect } from 'react-redux';

import itemTooltip from '../../../../components/tooltips/itemTooltip';
import './index.sass';

const PlayerItems = ({ player, items, version }) => {
  const { visionScore } = player;
  const itemIds = [];

  for (const key in player) {
    if (key.match(/item[\d]/)) {
      itemIds.push(player[key]);
    }
  }

  return (
    <div className="player_items">
      <div className="items_block">
        {itemIds.map((itemId, i) => {
				  if (itemId === 0) return <div className="item" key={`${itemId}_${i}`} />;

				  const tooltip = itemTooltip(items[itemId], version);
				  let content = (<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`} alt={`${itemId}_icon`} />);

				  if (i === 6) {
				    content = (
  <>
    <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`} alt={`${itemId}_icon`} />
    <div className="vision_score">{visionScore}</div>
  </>
				    );
				  }

				  return (
  <div className="item" data-tip={tooltip} data-for="tooltip" key={`${itemId}_${i}`}>
    {content}
  </div>
				  );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  version: state.version,
  items: state.items,
});

export default connect(mapStateToProps)(PlayerItems);
