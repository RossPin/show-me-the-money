const db = require('./connection')


function postMeeting(meeting) {
    return db('meetings')
        .insert(meeting)
}

function getMeetings() {
    return db('meetings')
        .select()
}


module.exports = {
    postMeeting,
    getMeetings
}