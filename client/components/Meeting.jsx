import React from 'react'
import {connect} from 'react-redux'
import AddAttendee from './AddAttendee'
import CostTracker from './CostTracker'

class Meeting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attendees: [],
      inProgress: false
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.addAttendee = this.addAttendee.bind(this)
  }

  clickHandler() {
    this.setState({
      inProgress: true
    })
  }

  addAttendee(attendee){
    const {attendees} = this.state
    attendees.push(attendee)
    this.setState({attendees})
  }

  render(){
    const inProgress = this.state.inProgress
    return (
      <div className="container">
        <h2 className="title is-2">{inProgress ? 'Meeting In Progress' : 'Start Meeting'}</h2>
        <div className="columns">
          <div className="column is-6">
          <h1 className="title is-2">Attendees</h1>
            <ul>
            {this.state.attendees.map((attendee, i) => (
              <li key={i}>{attendee.first_name} {attendee.last_name}</li>
            ))}
            </ul>
          </div>
          <div className="column is-6">
            {!inProgress && <AddAttendee addAttendee={this.addAttendee}/>}
            {inProgress && <CostTracker />}
            <button onClick={this.clickHandler} className="button is-large is-fullwidth is-success">{inProgress ? 'End Meeting' : 'Start Meeting'}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Meeting)
