import {currentMeeting} from '../../client/reducers/currentMeeting'
import {initialState} from '../../client/reducers/currentMeeting'


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
    time: 0 
  }
  const actual = currentMeeting(undefined, action)

  expect(actual).toEqual(expected)
})



