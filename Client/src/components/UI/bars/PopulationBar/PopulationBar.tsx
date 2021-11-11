import React from 'react';

import findPercent from '../../../../utils/actionsWithNums/findPercent';
import cl from './PopulationBar.module.sass';

const PopulationBar: React.FC<PopulationBarProps> = ({
  max, current, pop, className,
}) => {
  const classes = [cl.bar];
  pop ? classes.push(cl.pop) : classes.push(cl.rate);
  if (className) classes.push(className);

  const percent = findPercent(current, max, 1);
  const min = max / 10;
  const value = current < min && current > 0 ? min : current;

  return (
    <div className={classes.join(' ')}>
      <progress max={max} value={value} />
      <span className={cl.value}>{percent}%</span>
    </div>
  );
};

type PopulationBarProps = {
  max: number;
  current: number;
  pop?: boolean;
  className?: string;
};

export default PopulationBar;
