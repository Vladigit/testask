import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mainReducer } from './store/reducers'

import React from 'react'
import { render } from 'react-dom'
import App from './Components/App'

import './less/index.less'

var store = createStore(mainReducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('main'))