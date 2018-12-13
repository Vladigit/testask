import React from 'react'

export default function SearchBox(props) {
    return(
    <div>
        <input type='text' className='search-box' placeholder='search' onInput={props.filtring} />
    </div>
    )
}