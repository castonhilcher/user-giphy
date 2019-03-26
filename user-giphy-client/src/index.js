import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';
import App from './components/App';

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
