import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './store'

// toda vez que for despachar uma action, precisa do objeto dispatch, 
// com o redux-thunk eu despacho quantas actions eu precisar
// store - é o conjunto de reducers que vai ser criado no mainReducer
const store = applyMiddleware(thunk)(createStore)(mainReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
