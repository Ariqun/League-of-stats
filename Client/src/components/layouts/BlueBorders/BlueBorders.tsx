import React from 'react';

import cl from './BlueBorders.module.sass';

const BlueBorders: React.FC<BlueBordersProps> = ({
  type = 'normal', children,
}) => (
  <div className={`${cl.horizontal_borders} ${cl[type]}`}>
    <div className={cl.vertical_borders}>
      {children}
    </div>
  </div>
);

type BlueBordersProps = {
  type?: 'normal' | 'video';
};

export default BlueBorders;
