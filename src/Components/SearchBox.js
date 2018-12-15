import React from 'react'
import { connect } from 'react-redux'

export default connect (
    state => ({
        state
    }),
    dispatch => ({
        onFilter: e => {
            dispatch({type: 'filtring_of_films', filter: e.target.value})
        }
    })
)(
    function SearchBox(props) {
        return(
        <div>
            <input type='text' className='search-box' placeholder='search' onInput={props.onFilter} />
        </div>
        )
    }
)