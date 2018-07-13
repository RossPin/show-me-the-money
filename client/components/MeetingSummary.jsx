import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

class MeetingSummary extends React.Component {
    constructor(props) {
        super(props)
    }

    


    render() {
        return (
            <div className="container">
                <h2 className="title is-2">Meeting Summary</h2>
                <div className="columns is-multiline">
                    <div className="column is-6">
                        <h2 className="title is-2">Attendees</h2>
                        <ul>
                            {this.props.meeting.attendee_list.map((attendee, i) => (
                                <li key={i}>{attendee.first_name} {attendee.last_name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="column is-6">
                        <h2 className='title is-2'>Meeting: {this.props.meeting.meeting_name}</h2>
                        <br/>
                        <h3 className='subtitle is-3'>Duration: {this.props.meeting.duration}</h3>
                        <hr />
                        <h2 className='title-is-2'>Total Cost: ${this.props.meeting.cost}</h2>
                    </div>
                    <div className="column is-12">
                        <Link className="button is-large is-fullwidth is-success" to="/history">Back</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(MeetingSummary)
