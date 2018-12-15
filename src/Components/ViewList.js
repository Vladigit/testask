import React, {PureComponent} from 'react'
import { connect } from 'react-redux'

function Overview(props) {
    return(
    <div className='overview'>
        <header>
            Release: {props.film.release_date}<span> </span>
            Rating: {props.film.vote_average}
        </header>
        <p className='desc'>{props.film.overview}</p>
        <button onClick={props.close}><b>Less</b></button>
    </div>
    )
}

class ViewList extends PureComponent {

    filtringFilms(films, filter) {
        let filtredFilms = []

        for(let film of films) {
            if (new RegExp(filter, 'i').test(film.title) && films)
                filtredFilms.push(film)
        }
        return filtredFilms
    }

    render() {
        var films = this.filtringFilms(this.props.state.films, this.props.state.filter).map((film) => {
            if(film.genre_ids && this.props.state.genres) {
                var keywords = []

                for(let key of film.genre_ids) {
                    for (let gen of this.props.state.genres) {
                        if (key === gen.id) {
                            keywords.push(gen.name)
                        }
                    }
                }

                keywords = keywords.map((key, index) => <span key={index} className='key-word'>#{key} </span>)
            }

            return (
                <div className='film-container' key={film.id}>
                    <div>
                        <h2>{film.title}</h2><br />
                        <div>
                            {keywords}
                        </div>
                        <button className='details' onClick={this.props.onOpenFilmDescription.bind(this,film.id)}>More</button>
                    </div>
                    <img src={this.props.tmDB.getImgPath(film.poster_path)} />
                    {this.props.state.openedFilmId === film.id ? <Overview film={film} close={this.props.onOpenFilmDescription.bind(this, null)} /> : null}
                </div>
            )
        })
        return(
            <div className='view'>{films.length ? films : 'loading...'}</div>
        ) 
    }
}

export default connect(
    state => ({
        state
    }),
    dispatch => ({
        onOpenFilmDescription: id => {
            dispatch({type: 'open_film_description', id})
        }
    })
)(ViewList)