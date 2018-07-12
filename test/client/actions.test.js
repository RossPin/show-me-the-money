import {startMeeting, endMeeting, tickOneSecond, resetMeeting} from '../../client/actions/currentMeeting'


test ("start meeting action does what it's supposed to do", () => {

  const fakeAttendees = ["Cate", "Dan", "Reuben", "Rebecca", "Ross", "Anton"]
  const fakeMeeting_name = "The dream team"

  const expected = {
    type: "START_MEETING",
    attendees: fakeAttendees,
    meeting_name: fakeMeeting_name,
    inProgress: true
  }

  const actual = startMeeting(fakeAttendees, fakeMeeting_name)

  expect(actual).toEqual(expected)
})



test ("end meeting action does what it's supposed to do", () => {

  const expected = {
    type: "END_MEETING",
    inProgress: false
  }

  const actual = endMeeting()

  expect(actual).toEqual(expected)
})



test ("tick one second action does what it's supposed to do", () => {

  const expected = {
    type: "TICK_ONE_SECOND",
    inProgress: true
  }

  const actual = tickOneSecond()

  expect(actual).toEqual(expected)
})



test ("tick one second action does what it's supposed to do", () => {

  const expected = {
    type: "RESET_MEETING",
    inProgress: false
  }

  const actual = resetMeeting()

  expect(actual).toEqual(expected)
})