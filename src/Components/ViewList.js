import React, {PureComponent} from 'react'
import { connect } from 'react-redux'

function Overview(props) {
    return(
    <div className='overview'>
        <header>
            Release: {props.film.release_date}
            <span> </span>
            Rating: {props.film.vote_average}
        </header>
        <p className='desc'>{props.film.overview}</p>
        <button onClick={props.close}><b>Less</b></button>
    </div>
    )
}

class ViewList extends PureComponent {

    state = {
        openMovieId: -1
    }

    render() {

        const { filter, genres } = this.props
        var films = filter.results.map((film) => {

            if(film.genre_ids && genres) {
                var keywords = []

                for(let key of film.genre_ids) {
                    for (let gen of genres) {
                        if (key === gen.id) {
                            keywords.push(gen.name)
                        }
                    }
                }
                keywords = keywords.map((key, index) => (
                    <span key={index} className='key-word'>#{key} </span>
                ))
            }

            return (
                <div className='film-container' key={film.id}>
                    <div>
                        <h2>{film.title}</h2><br />
                        <div>
                            {keywords}
                        </div>
                        <button className='details' onClick={this.openDesc.bind(this,film.id)}>More</button>
                    </div>
                    <img src={this.props.tmDB.getImgPath(film.poster_path)} />
                    {
                        this.state.openMovieId === film.id 
                        ? <Overview film={film} close={this.openDesc.bind(this)} />
                        : null
                    }
                </div>
            )
        })
        return(
            <div className='view'>{
                films.length
                ? films
                : 'loading...'
            }</div>
        )
    }

    openDesc = (id = -1) => {
        this.setState({
            openMovieId: id
        })
    }

}

export default connect(
    state => {
        let { filter, genres, films } = state
        return {
            films,
            genres,
            filter
        }
    },
    null
)(ViewList)