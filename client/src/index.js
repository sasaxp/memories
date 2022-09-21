import {createRoot} from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App'
import reducers from './reducers';
const store= createStore(reducers, compose(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);