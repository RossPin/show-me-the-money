const initialState = {
  meetings: [],
  isFetching: false,
  isSaving: false
}


export default function meetings (state = initialState, action) {
  switch (action.type) {
    case "REQUEST_MEETINGS":
    return {
      ...state,
      isFetching: true
    }
    case "RECEIVE_MEETINGS":
    return {
      meetings : action.meetings,
      isFetching: false
    }
    case "ADD_MEETING":
    return {
      meetings: [...state.meetings, action.meeting],
      isSaving: false
    }
    case "SAVE_MEETING":
    return {
      ...state,
      isSaving: true
    }
    default: 
    return state
  }
} 