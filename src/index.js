import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const initialState = window.__INITIAL_STATE__;
let store = createStore(todoApp, initialState);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
