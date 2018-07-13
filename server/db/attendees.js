const conn = require('./connection')


function postAttendeesMeetings(attendees_meetings, testDb) {
  const db = testDb || conn
    return db('attendees')
        .insert(attendees_meetings)
}



module.exports = {
    postAttendeesMeetings
}
