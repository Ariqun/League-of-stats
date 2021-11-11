import React from 'react';
import { useTranslation } from 'react-i18next';

import cl from './AverageBlock.module.sass';

const AverageBlock: React.FC<AverageBlockProps> = ({
  type, value, combo = false,
}) => {
  const [t] = useTranslation();

  const classes = [cl.avg_block, 'col-4'];
  if (combo) classes.splice(1, 1, 'col-3');

  return (
    <div className={classes.join(' ')}>
      <span className={cl.title}>
        {t(type)}
      </span>

      <span className={cl.value}>
        {value}
      </span>
    </div>
  );
};

type AverageBlockProps = {
  type: string;
  value: string;
  combo?: boolean;
};

export default AverageBlock;
