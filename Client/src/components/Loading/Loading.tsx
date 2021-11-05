import React from 'react';
import Loader from 'react-loader-spinner';

import cl from './Loading.module.sass';

const Loading: React.FC = () => (
  <div className={cl.loading_block}>
    <Loader type="ThreeDots" color="#0057FF" />
  </div>
);

export default Loading;
