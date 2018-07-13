import React from 'react'
import {connect} from 'react-redux'
import AddAttendee from './AddAttendee'
import CostTracker from './CostTracker'
import {startMeeting, tickOneSecond, endMeeting} from '../actions/currentMeeting'
import {postMeeting} from '../actions/meetings'

let ticker

class Meeting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attendees: [],
      inProgress: false,
      meeting_name: ''
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.addAttendee = this.addAttendee.bind(this)
    this.startMeeting = this.startMeeting.bind(this)
    this.endMeeting = this.endMeeting.bind(this)
    this.calcCosts = this.calcCosts.bind(this)
    this.updateDetails = this.updateDetails.bind(this)
  }

  startMeeting(){
    this.props.dispatch(startMeeting(this.state.attendees, this.state.meeting_name))
    ticker = setInterval(() => {
      this.props.dispatch(tickOneSecond())
    },1000)
  }

  endMeeting(){
    this.props.dispatch(endMeeting())
    clearInterval(ticker)
    this.setState({
      inProgress: false
    })
    const {attendees, meeting_name, duration} = this.props.currentMeeting
    const meeting = {
      attendees: attendees.length,
      attendee_list: attendees,
      meeting_name: meeting_name,
      duration: duration,
      cost: this.calcCosts(duration)
    }
    this.props.dispatch(postMeeting(meeting))
    document.location = "/#/meetingsummary"
  }

  calcCosts(duration){
    const rate = this.state.attendees.reduce((acc, x) => {
      return acc + x.hourly_wage
    },0 )
    let cost = rate/3600 * duration
    return Math.round(cost * 100)/100
  }

  clickHandler() {
    this.state.inProgress ? this.endMeeting() : this.startMeeting()
    this.setState({
      inProgress: true
    })
  }

  updateDetails(e){
    this.setState({meeting_name: e.target.value})
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
            {!inProgress && <div><AddAttendee addAttendee={this.addAttendee}/>
            <form>
              <div className="field control">
              <input className="input is-medium" placeholder="Meeting Title" name="meeting_name" onChange={this.updateDetails} value={this.state.meeting_name}/>
              </div>
              </form>
              <br />
              </div>
            }
            {inProgress && <CostTracker rate={rate}/>}
            <button onClick={this.clickHandler} className="button is-large is-fullwidth is-success">{inProgress ? 'End Meeting' : 'Start Meeting'}</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({currentMeeting}) => {
  return {
    currentMeeting
  }
}

export default connect(mapStateToProps)(Meeting)
