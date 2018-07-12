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