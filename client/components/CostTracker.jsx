import React from 'react'
import {connect} from 'react-redux'

const CostTracker = props => {

  const floor = num => Math.floor(num)
  const calcCosts = (duration) => ({ hours: floor(duration / 3600), minutes: floor(duration % 3600 / 60), seconds: floor(duration % 60) })
  const {hours, minutes, seconds} = calcCosts(props.meeting.duration)
  let cost = props.rate/3600 * props.meeting.duration
  cost = Math.round(cost * 100)/100

    return(
      <div>
        <h2 className="title is-2">Meeting Duration</h2>
        <h1 className="title is-2">{`${hours}:${minutes}:${seconds}`}</h1>
        <h2 className="title is-2">Cost </h2>
        <h1 className="title is-2">${cost}</h1>
        <br />
      </div>
    )
}

const mapStateToProps = ({currentMeeting}) => {
  return {
    meeting: currentMeeting
  }
}

export default connect(mapStateToProps)(CostTracker)
