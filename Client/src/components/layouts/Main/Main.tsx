import React from 'react';

import cl from './Main.module.sass';

const Main: React.FC<MainProps> = ({ className = '', children }) => (
  <main className={`${cl.main} ${className}`}>
    {children}
  </main>
);

type MainProps = {
  className?: string;
};

export default Main;
