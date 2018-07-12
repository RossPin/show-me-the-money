import request from '../utils/api'
import {error} from './meetings'

export function requestUsers() {
  return {
    type: "REQUEST_USERS",
    isFetching: true
  }
}


export function receiveUsers(users) {
  return {
    type: "RECEIVE_USERS",
    users,
    isFetching: false
  }
}


export function fetchUsers() {
  return (dispatch) => {
    dispatch(requestUsers())
    return request('get', '/api/users')
    .then(users => {
      dispatch(receiveUsers(users))
    })
    .catch(err => {
      dispatch(error(err))
    })

  }

}