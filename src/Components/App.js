import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import TMDb from '../TMDb'

import SearchBox from './SearchBox'
import ViewList from './ViewList'

var tmDB = new TMDb('0145bb2c9395c62035dc00ae5b1cc628')

function putDispatchToProps(dispatch) {

    function initializeFilms(films) {
        dispatch({
            type: 'FILMS_INIT',
            payload: films 
        })
    }
    
    function initializeGenres(genres) {
        dispatch({
            type: 'GENRES_INIT',
            payload: genres
        })
    }

    return {
        initializeFilms,
        initializeGenres
    }
}

class App extends PureComponent {
    componentWillMount() {

        const { initializeFilms, initializeGenres } = this.props

        tmDB.Request('/movie/top_rated').then(response => {
            initializeFilms(response.results)
        })

        tmDB.Request('/genre/movie/list').then(response => {
            initializeGenres(response.genres)
        })
        
    }
    render() {
        return(
        <div>
            <SearchBox />
            <ViewList tmDB={tmDB} />
        </div>
        )
    }
}

export default connect(
    null,
    putDispatchToProps
)(App)