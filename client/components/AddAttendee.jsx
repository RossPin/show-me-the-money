import React from 'react'
import {connect} from 'react-redux'

const initialState = {
  first_name: '',
  last_name: '',
  hourly_wage: '',
  users: []
}

class AddAttendee extends React.Component {
  constructor(props){
    super (props)
    this.state = {...initialState}

    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }

  updateDetails(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  submit(e) {
    e.preventDefault()
    let {first_name, last_name, hourly_wage} = this.state
    hourly_wage = Number(hourly_wage)
    this.props.addAttendee({first_name, last_name, hourly_wage})
    this.setState({...initialState})
  }

  componentWillReceiveProps (nextProps) {
    this.setState ({
      users: nextProps.users
    })
  }

  render() {    
    return(
      <div>
        <div className="dropdown is-hoverable">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Add an Attendee</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {this.state.users.map(user => {
                return <div className="dropdown-item" onClick={() => this.props.addAttendee(user)}>{user.first_name}{user.last_name}</div>
              })}
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <form onSubmit={this.submit}>
          <div className="field control">
            <input className="input is-medium" placeholder="Attendee First Name" name="first_name" onChange={this.updateDetails} value={this.state.first_name} />
          </div>

          <div className="field control">
            <input className="input is-medium" placeholder="Attendee Last Name" name="last_name" onChange={this.updateDetails} value={this.state.last_name} />
          </div>

          <div className="field control">
            <input className="input is-medium" placeholder="Hourly Wage" name="hourly_wage" onChange={this.updateDetails} value={this.state.hourly_wage} />
          </div>

          <input className="button is-medium" type="submit" value="Add Attendee" />
        </form>
        <br />
      </div>
    )
  }
}

const mapStateToProps = ({users}) => {
  return {
    users: users.users
  }
}

export default connect(mapStateToProps)(AddAttendee)
