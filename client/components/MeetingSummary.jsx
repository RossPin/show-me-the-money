import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import request from '../utils/api'

class MeetingSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          meeting: {
            attendee_list: [],
            meeting_name: '',
            duration: 0,
            cost: 0,
            date_created: 1531445529237,
          }
        }
    }

    componentDidMount(){        
        const id = this.props.match.params.id              
        request('get', 'meetings/'+id)
            .then((res)=> {                
            const meeting = res.body.meeting 
            this.setState({meeting})        
            })
            .catch(err => {            
            })
    }

    componentWillReceiveProps (nextProps) {
      this.setState({
        meeting: nextProps.meetings[nextProps.meetings.length -1]
      })
    }

    render() {       
      const floor = num => Math.floor(num)
      const calcCosts = (duration) => ({ hours: floor(duration / 3600), minutes: floor(duration % 3600 / 60), seconds: floor(duration % 60) })
      const {hours, minutes, seconds} = calcCosts(this.state.meeting.duration)
        return (
            <div className="container">
                <h2 className="title is-2">Meeting Summary</h2>
                <div className="columns is-multiline">
                    <div className="column is-6">
                        <h2 className="title is-2">Attendees</h2>
                        <ul>
                            {this.state.meeting.attendee_list && this.state.meeting.attendee_list.map((attendee, i) => (
                                <li key={i}>{attendee.first_name} {attendee.last_name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="column is-6">
                        <h2 className='title is-2'>Meeting: {this.state.meeting.meeting_name}</h2>
                        <h4 className='subtitle is-4'>{moment(this.state.meeting.date_created).format('hh:mm a DD/MM/YY')}</h4>
                        <br/>
                        <h3 className='subtitle is-3'>Duration: {`${hours}:${("00" + minutes).slice(-2)}:${("00" + seconds).slice(-2)}`}</h3>
                        <hr />
                        <h2 className='title is-2'>Total Cost: ${this.state.meeting.cost.toFixed(2)}</h2>
                    </div>
                    <div className="column is-12">
                        <Link className="button is-large is-fullwidth is-success" to="/history">Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({meetings}) => {
  return {
    meetings: meetings.meetings
  }
}

export default connect(mapStateToProps)(MeetingSummary)
