import React from 'react'
import {connect} from 'react-redux'
import AddAttendee from './AddAttendee'
import CostTracker from './CostTracker'
import {startMeeting, tickOneSecond} from '../actions/currentMeeting'

class Meeting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attendees: [],
      inProgress: false
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.addAttendee = this.addAttendee.bind(this)
    this.startMeeting = this.startMeeting.bind(this)
  }

  startMeeting(){
    this.props.dispatch(startMeeting('Meeting' , this.state.attendees))
    console.log('start meeting')
    setInterval(() => {
      this.props.dispatch(tickOneSecond())
    },1000)
  }

  clickHandler() {
    if (!this.state.inProgress) this.startMeeting()
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
    const rate = this.state.attendees.reduce((acc, x) => {
      return acc + x.hourly_wage
    },0 )
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
            {inProgress && <CostTracker rate={rate}/>}
            <button onClick={this.clickHandler} className="button is-large is-fullwidth is-success">{inProgress ? 'End Meeting' : 'Start Meeting'}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Meeting)
