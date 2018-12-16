import React, { PureComponent } from 'react'
import { connect } from 'react-redux'


function putDispatchToProps(dispatch) {

    function filtring(event) {
        dispatch({
            type: 'FILTRING_OF_FILMS',
            payload: event.target.value
        })
    }

    return {
        filtring
    }
}

class SearchBox extends PureComponent {
    render () {
        return(
        <input
            type='text'
            className='search-box'
            placeholder='search'
            onInput={this.props.filtring}
        />
        )
    }
}

export default connect(
    null,
    putDispatchToProps
)(SearchBox)