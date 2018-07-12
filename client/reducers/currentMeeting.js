export const initialState = {
  attendees: [],
  meeting_name: '',
  inProgress: false,
  duration: 0
}


export default function currentMeeting(state = initialState, action) {
  switch (action.type) {
    case "START_MEETING":
      return {
        attendees : action.attendees,
        meeting_name : action.meeting_name,
        inProgress: true,
        duration: 0
      }
    case "END_MEETING":
      return {
        ...state,
        inProgress: false
      }
    case "TICK_ONE_SECOND":
      return {
        ...state,
        inProgress: true,
        duration: state.duration + 1
      }
    case "RESET_MEETING":
      return initialState
    default:
      return state
  }
}
