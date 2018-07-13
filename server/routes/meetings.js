const router = require('express').Router()

const { postMeeting, getMeetings } = require('../db/meetings')
const { createAttendee } = require('../db/users')
const { postAttendeesMeetings } = require('../db/attendees')

router.post('/', (req, res) => {

    let meeting = req.body
    let attendeeList = [...meeting.attendee_list]
    addAttendeesToUser(attendeeList)
        .then((ids) => {
        delete meeting.attendee_list
        postMeeting(meeting)
            .then((insertedMeetingIds) => {
                addAttendeesMeeting(ids, insertedMeetingIds).then(() => {
                meeting.id = insertedMeetingIds[0] // inserting meeting id before return
                res.json({ meeting })
            })
           
            })
        }) .catch((err) => {
                res.json(Error[{ message: err }])
    })
})

router.get('/', (req, res) => {
    getMeetings()
        .then((meetings) => {
            res.json({ meetings })
        })
        .catch((err) => {
            res.json(Error[{ message: err }])
        })
})

function addAttendeesMeeting(ids, insertedMeetingIds) {
    const attendeesMeetingData = []
    ids.forEach((id) => {
        attendeesMeetingData.push({user_id: id, meeting_id: insertedMeetingIds[0]})
    })
    return postAttendeesMeetings(attendeesMeetingData)
}

function addAttendeesToUser(attendeeList) {
    const allAttendees = []
    attendeeList.forEach((attendee => {
        const { first_name, last_name, hourly_wage } = attendee
        allAttendees.push(createAttendee(first_name, last_name, hourly_wage))
    }))
    return Promise.all(allAttendees).then((all) => {
        return all.map(ids => ids[0])
    })
}

module.exports = router
