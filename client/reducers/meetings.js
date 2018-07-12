export const initialState = {
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
        ...state,
        meetings : action.meetings,
        isFetching: false
      }
    case "ADD_MEETING":
    return {
      ...state,
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
