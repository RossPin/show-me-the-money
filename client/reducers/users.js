export const initialState = {
  users: [],
  isFetching: false
}


export default function users(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_USERS":
      return {
        ...state,
        isFetching: true
      }
    case "RECEIVE_USERS":
      return {
        users: action.users,
        isFetching: false
      }
    default:
      return state
  }
} 