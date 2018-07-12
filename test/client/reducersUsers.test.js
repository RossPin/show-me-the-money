import users from '../../client/reducers/users'
import {initialState} from '../../client/reducers/users'


test("Test REQUEST_USERS case", () => {

  const action = {
    type: "REQUEST_USERS",
    isFetching: true
  }

  const expected = {
    ...initialState,
    isFetching: true
  }

  const actual = users(undefined, action)

  expect(actual).toEqual(expected)
})



test("Test RECEIVE_USERS case", () => {

  const fakeUsers = ["Cate", "Rebecca", "Reuben"]

  const action = {
    type: "RECEIVE_USERS",
    users: fakeUsers,
    isFetching: false
  }

  const expected = {
    ...initialState,
    users: action.users
  }

  const actual = users(undefined, action)

  expect(actual).toEqual(expected)
})