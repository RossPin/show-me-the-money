const conn = require('./connection')


function postMeeting(meeting, testDb) {
  const db = testDb || conn
    return db('meetings')
        .insert(meeting)
}

function getMeetings(testDb) {
  const db = testDb || conn
    return db('meetings')
        .select()
}

function getMeeting (id, testDb) {
  const db = testDb || conn
  return db('meetings')
  .where('meetings.id', id)
  .leftOuterJoin('attendees', 'meetings.id', 'attendees.meeting_id')
  .leftOuterJoin('users', 'user_id', 'users.id')
  .then(rawAttendees => {
    let meeting = {}

    meeting.meeting_name = rawAttendees[0].meeting_name
    meeting.duration = rawAttendees[0].duration
    meeting.cost = rawAttendees[0].cost
    meeting.id = rawAttendees[0].meeting_id
    meeting.attendees = rawAttendees[0].attendees

    let attendeesList = []

    rawAttendees.forEach((user) => {
      delete user.id
      delete user.meeting_name
      delete user.duration
      delete user.attendees
      delete user.cost
      delete user.user_id
      delete user.meeting_id
      delete user.hourly_wage
      delete user.hash
      attendeesList.push(user)
      return user
    })

    meeting.attendees_list = attendeesList
    return meeting
  })
}


module.exports = {
    postMeeting,
    getMeetings,
    getMeeting
}
