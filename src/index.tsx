import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './core/reducer';
import * as serviceWorker from './serviceWorker';
import { getInitialState } from './core/state';

const store = createStore(
  rootReducer,
  getInitialState(),
  applyMiddleware(thunk)
);
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
