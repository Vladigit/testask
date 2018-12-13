import React, {PureComponent} from 'react'

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
    state = {
        openedDesc: null
    }

    filtringFilms(films,filter) {
        let filtredFilms = []

        for(let film of films) {
            if (new RegExp(filter, 'i').test(film.title))
                filtredFilms.push(film)
        }

        return filtredFilms
    }

    render() {
        const {filmsList, tmDB, genres, filter} = this.props,
              {openedDesc} = this.state

        var films = this.filtringFilms(filmsList, filter).map((value, index) => {
            if(value.genre_ids && genres) {
                var keywords = []

                for(let key of value.genre_ids) {
                    for (let gen of genres) {
                        if (key === gen.id) {
                            keywords.push(gen.name)
                        }
                    }
                }

                keywords = keywords.map((key, index) => <span key={index} className='key-word'>#{key} </span>)
            }

            return (
                <div className='film-container' key={value.id}>
                    <div>
                        <h2>{value.title}</h2><br />
                        <div>
                            {keywords}
                        </div>
                        <button className='details' onClick={this.showInfo.bind(this, value.id)}>More</button>
                    </div>
                    <img src={tmDB.getImgPath(value.poster_path)} />
                    {openedDesc === value.id ? <Overview film={value} close={this.showInfo.bind(this)} /> : null}
                </div>
            )
        })

        return(
            <div className='view'>{films.length ? films : 'loading...'}</div>
        )
    }
    showInfo(openedId) {
        this.setState({
            openedDesc: openedId
        })
    }
}

export default ViewList