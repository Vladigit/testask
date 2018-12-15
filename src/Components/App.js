import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import TMDb from '../TMDb'

import SearchBox from './SearchBox'
import ViewList from './ViewList'

var tmDB = new TMDb('0145bb2c9395c62035dc00ae5b1cc628')

class App extends PureComponent {
    componentWillMount() {
        tmDB.Request('/movie/top_rated').then(response => {
            this.props.onFilmsInit(response.results)
        })
        tmDB.Request('/genre/movie/list').then(response => {
            this.props.onGenresInit(response.genres)
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
    state => ({}),
    dispatch => ({
        onFilmsInit: films => {
            dispatch({type: 'films_init', films})
        },
        onGenresInit: genres => {
            dispatch({type: 'genres_init', genres})
        }
    })
)(App)