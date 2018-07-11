const hash = require('../auth/hash')

const db = require('./connection')


function postMeeting (meeting) {
    return db('meetings')
    .insert(meeting)
}

module.exports = {
    postMeeting
}