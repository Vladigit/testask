
const initialState = {
    films: [],
    genres: [],
    filter: {
        value: '',
        results: []
    }
}

export function mainReducer(state = initialState, action) {
    switch (action.type) {

        case 'FILMS_INIT':
            return {
                ...state,
                films: action.payload,
                filter: {
                    value: '',
                    results: action.payload
                }
            }

        case 'GENRES_INIT':
            return {
                ...state,
                genres: action.payload
            }

        case 'FILTRING_OF_FILMS':
            var results = [],
                films = state.films

            if (films !== []) {
                for (let film of films) {
                    if (new RegExp(action.payload, 'i').test(film.title)) {
                        results.push(film)
                    }
                }
            }
            return {
                ...state,
                filter: {
                    results,
                    value: action.payload
                }
            }
    }
    return state
}