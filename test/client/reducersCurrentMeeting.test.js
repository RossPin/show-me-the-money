import currentMeeting from '../../client/reducers/currentMeeting'
import {initialState} from '../../client/reducers/currentMeeting'


//currentMeeting tests

test("Test initial state", () => {
  const expected = initialState
  const actual = currentMeeting(undefined, {})
  expect(actual).toEqual(expected)
})

test("Test START_MEETING case", () => {

  const action = {
    type: "START_MEETING",
    attendees: ["test","test","test"],
    meeting_name: "test meeting",
    inProgress: true,
  }

  const expected = {
    attendees: ["test","test","test"],
    meeting_name: "test meeting",
    inProgress: true,
    duration: 0
  }
  const actual = currentMeeting(undefined, action)

  expect(actual).toEqual(expected)
})



test("Test TICK_ONE_SECOND case", () => {

  const action = {
    type: "TICK_ONE_SECOND",
    inProgress: true
  }

  const expected = {
    ...initialState,
    inProgress: true,
    duration: 1
  }
  const actual = currentMeeting(undefined, action)

  expect(actual).toEqual(expected)
})


test("Test RESET_MEETING case", () => {

  const action = {
    type: "RESET_MEETING",
    inProgress: false
  }

  const expected = {
    ...initialState
  }
  const actual = currentMeeting(undefined, action)

  expect(actual).toEqual(expected)
})
