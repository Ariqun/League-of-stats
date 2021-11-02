import React from 'react';

import './loading.sass';

const LoadingPage = () => (
  <div className="loading_page">
    <div className="container">
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);

const LoadingBlock = () => (
  <div className="loading_block">
    <div className="spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export { LoadingPage, LoadingBlock };
