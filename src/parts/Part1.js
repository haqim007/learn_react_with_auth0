import React from 'react'

const Part1 = (props) => {
    return (
        <div>
            {`${props.title} ${props.match.params.id}`}
        </div>
    )
}

export default Part1;
