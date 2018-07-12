import React from 'react'

const CostTracker = props => {

  const floor = num => Math.floor(num)
  const calcCosts = (duration) => ({ hours: floor(duration / 3600), minutes: floor(duration % 3600 / 60), seconds: floor(duration % 60) }}
  const {hours, minutes, seconds} = calcCosts(props.meeting.duration)

    return(
      <div>
        <h2>Meeting Duration</h2>
        <h1>{`${hours}:${minutes}:${seconds}`}</h1>
        <h2>Cost </h2>
        <h1>${props.meeting.cost}</h1>
      </div>
    )
}

const mapStateToProps = ({meeting}) => {
  return {
    meeting
  }
}

export default CostTracker
