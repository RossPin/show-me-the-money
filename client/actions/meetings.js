import request from '../utils/api'



export function requestMeetings() {
  return {
    type: 'REQUEST_MEETING',
    isFetching: true
  }
}

export function receiveMeetings(meetings) {
  return {
    type: 'RECEIVE_MEETING',
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
    return request('post', '/api/meetings', meeting)
    .then(() => {
      dispatch(addMeeting(meeting))
    })
    .catch(err => {
      dispatch(meetingsError(err.message))
    })
  }
}


export function fetchMeetings() {
  return (dispatch) => {
    dispatch(requestMeetings())
    return request('get', '/api/meetings')
    .then((meetings)=> {
      dispatch(receiveMeetings(meetings))
    })
    .catch(err => {
      dispatch(meetingsError(err.message))
    })
  }

}

