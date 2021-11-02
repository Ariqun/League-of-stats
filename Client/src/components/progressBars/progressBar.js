import React from 'react';

import './index.sass';

const ProgressBar = ({ current, max }) => {
  const min = max / 10;
  let value = current;

  if (current < min && current > 0) value = min;

  return (
    <div className="progress_bar">
      <progress max={max} value={value} />
      <span className="value">{current}</span>
    </div>
  );
};

export default ProgressBar;
