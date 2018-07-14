import request from '../utils/api'



export function requestMeetings() {
  return {
    type: 'REQUEST_MEETINGS',
    isFetching: true
  }
}

export function receiveMeetings(meetings) {
  return {
    type: 'RECEIVE_MEETINGS',
    meetings,
    isFetching: false
  }
}

export function addMeeting(meeting) {
    return {
      type: 'ADD_MEETING',
      meeting,
      isSaving: false
    }
}

export function saveMeeting() {
  return {
    type: 'SAVING_MEETING',
    isSaving: true
  }
}


export function error(err) {
    return {
      type: 'ERROR',
      err
    }
}

export function postMeeting(meeting) {
  return(dispatch) => {
    dispatch(saveMeeting())
    return request('post', 'meetings', meeting)
    .then((res) => {
      const meetingResponse = res.body.meeting
      meetingResponse.attendee_list = meeting.attendee_list
      dispatch(addMeeting(meetingResponse))
      document.location = "/#/meeting/" + meetingResponse.id
    })
    .catch(err => {
      dispatch(error(err.message))
    })
  }
}


export function fetchMeetings() {
  return (dispatch) => {
    dispatch(requestMeetings())
    return request('get', 'meetings')
    .then((res)=> {
      dispatch(receiveMeetings(res.body.meetings))
    })
    .catch(err => {
      dispatch(error(err.message))
    })
  }

}
