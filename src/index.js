import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.module.css';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import pageManagerReducer from './store/reducers/pageManager';
import newsReducer from './store/reducers/news';
import authReducer from './store/reducers/auth';
import paramsReducer from './store/reducers/params';
import newspaperReducer from './store/reducers/newspaper';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  pageManager: pageManagerReducer,
  news: newsReducer,
  auth: authReducer,
  params: paramsReducer,
  newspaper: newspaperReducer
});

const store = (
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
