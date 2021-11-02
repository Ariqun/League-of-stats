import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import Background from './components/background';

import './i18n.js';
import './index.sass';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Background />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
