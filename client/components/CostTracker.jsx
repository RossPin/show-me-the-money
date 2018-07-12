import React from 'react'

const CostTracker = props => {

const hours = Math.floor(props.duration / 3600)
const minutes = Math.floor(props.duration % 3600 / 60 )
const seconds = Math.floor(props.duration % 60)

    return(
      <div>
        <h2>Meeting Duration</h2>
        <h1>{`${hours}:${minutes}:${seconds}`}</h1>
        <h2>Cost </h2>
        <h1>${props.cost}</h1>
      </div>
    )
}

export default CostTracker
