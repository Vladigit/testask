import React, {PureComponent} from 'react'

class ViewList extends PureComponent {
    state = {
        loaded: false
    }

    render() {
        const {filmsList, tmDB, genres, filter} = this.props
        var filtredFilms = []

        filmsList.map(film => {
            if (new RegExp(filter, 'i').test(film.title))
                filtredFilms.push(film)
        })

        var films = filtredFilms.map(value => {
            let keywords = []

            if(value.genre_ids && genres.genres) {

                for(let key of value.genre_ids) {

                    for (let gen of genres.genres) {

                        if (key === gen.id) {
                            keywords.push(gen.name)
                        }
                    }
                }
            }

            return (
                <div className='film-container' key={value.id}>
                    <h2>{value.title}<br />keywords: {keywords.join(' ')}</h2>

                    <img src={tmDB.getImgPath(value.poster_path)} />
                </div>
            )
        })
        return(
            <div className='view'>{films.length ? films : 'loading...'}</div>
        )
    }
}

export default ViewList