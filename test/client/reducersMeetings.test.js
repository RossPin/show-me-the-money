import meetings from '../../client/reducers/meetings'
import {initialState} from '../../client/reducers/meetings'



test("Test REQUEST_MEETINGS case", () => {

  const action = {
    type: "REQUEST_MEETINGS",
    isFetching: true
  }

  const expected = {
    ...initialState,
    isFetching: true
  }

  const actual = meetings(undefined, action)

  expect(actual).toEqual(expected)
})



test("Test RECEIVE_MEETINGS case", () => {

  const fakeMeetings = ["a", "b", "c"]

  const action = {
    type: "RECEIVE_MEETINGS",
    meetings: fakeMeetings,
    isFetching: false
  }

  const expected = {
    ...initialState,
    meetings: fakeMeetings
  }

  const actual = meetings(undefined, action)

  expect(actual).toEqual(expected)
})



test("Test ADD_MEETING case", () => {

  const fakeMeeting = "a"

  const action = {
    type: "ADD_MEETING",
    meeting: fakeMeeting,
    isSaving: false
  }

  const expected = {
    ...initialState,
    meetings: [...initialState.meetings, fakeMeeting]
  }

  const actual = meetings(undefined, action)

  expect(actual).toEqual(expected)
})



test("Test SAVE_MEETING case", () => {

  const action = {
    type: "SAVE_MEETING",
    isSaving: true
  }

  const expected = {
    ...initialState,
    isSaving: true
  }

  const actual = meetings(undefined, action)

  expect(actual).toEqual(expected)
})