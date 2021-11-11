import React from 'react';

import Items from './Items';
import Runes from './Runes';
import cl from './Builds.module.sass';

const Builds: React.FC = () => (
  <div className={cl.builds}>
    <Items />
    <Runes />
  </div>
);

export default Builds;
