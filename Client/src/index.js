import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app/app';
import store from './store/store';

import './i18n.js';
import './index.sass';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<React.StrictMode>
				<App/>
			</React.StrictMode>
		</Router>
	</Provider>,
	document.getElementById('root')
);