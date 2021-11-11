import React from 'react';

import PopulationBar from '../../../../../ui/bars/PopulationBar';
import cl from './SingleItem.module.sass';

const SingleItem: React.FC<SingleItemProps> = ({
  item, matches, index, isShowAll,
}) => {
  const { id, count } = item;
  const classes = [cl.item];

  if (!isShowAll && index >= 8) classes.push(cl.hidden);

  return (
    <div className={classes.join(' ')} key={id}>
      <div className={cl.icon}>
        <img src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${id}.png`} alt={id} />
      </div>

      <PopulationBar
        className={cl.pop_bar}
        max={matches}
        current={count}
        pop
      />
    </div>
  );
};

type SingleItemProps = {
  item: {
    id: string;
    count: number;
  };
  matches: number;
  index: number;
  isShowAll: boolean;
};

export default SingleItem;
