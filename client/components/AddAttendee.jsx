import React from 'react'

const initialState = {
  first_name: '',
  last_name: '',
  hourly_wage: ''
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

  render() {
    return(
      <div>
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

export default AddAttendee
