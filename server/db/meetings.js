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


module.exports = {
    postMeeting,
    getMeetings
}
