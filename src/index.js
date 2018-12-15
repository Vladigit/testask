import { createStore } from 'redux'
import { Provider } from 'react-redux'

import React from 'react'
import {render} from 'react-dom'

import App from './Components/App'
import './less/index.less'

const initializedState = {
    films: [],
    genres: [],
    filter: '',
    openedFilmId: null
}

function mainReducer(state = initializedState, action) {
    if (action.type === 'films_init') {
        return {
            ...state,
            films: action.films
        }
    } else 
    if (action.type === 'genres_init') {
        return {
            ...state,
            genres: action.genres
        }
    } else
    if (action.type === 'filtring_of_films') {
        return {
            ...state,
            filter: action.filter
        }
    } else
    if (action.type === 'open_film_description') {
        return {
            ...state,
            openedFilmId: action.id
        }
    }
    return state
}

var store = createStore(mainReducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('main'))