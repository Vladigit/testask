import React, {PureComponent} from 'react'
import {render} from 'react-dom'
import TMDb from './TMDb'
import SearchBox from './Components/SearchBox'
import ViewList from './Components/ViewList'
import './less/index.less'

var tmDB = new TMDb('0145bb2c9395c62035dc00ae5b1cc628')

class App extends PureComponent {
    state = {
        filmsList: null,
        genres: null,
        filter: ''
    }

    componentWillMount() {
        tmDB.Request('/movie/top_rated',{}).then(response => {
            this.setState({
                filmsList: response.results
            })
        })
        tmDB.Request('/genre/movie/list',{}).then(response => {
            this.setState({
                genres: response.genres
            })
        })
    }

    render() {
        const {filmsList, genres, filter} = this.state
        return(
        <div>
            <SearchBox filtring={this.filtring.bind(this)} />
            <ViewList filmsList={filmsList || []} tmDB={tmDB} genres={genres || []} filter={filter} />
        </div>
        )
    }

    filtring(e) {
        this.setState({
            filter: e.target.value
        })
    }
}

render(<App />, document.getElementById('main'))