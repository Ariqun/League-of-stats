import React from 'react';
import { useTranslation } from 'react-i18next';

const AvgBlock = ({ type, value, combo = false }) => {
  const className = combo ? 'avg_stat col-3' : 'avg_stat col-6';
  const [t] = useTranslation();

  return (
    <div className={className}>
      <span className="title">{t(type)}</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default AvgBlock;
