const router = require('express').Router()

const { postMeeting, getMeetings, getMeeting } = require('../db/meetings')
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
                    meeting.id = insertedMeetingIds[0] 
                   return addAttendeesMeeting(ids, insertedMeetingIds)
                })
                .then(() => {
                    res.json({ meeting })
                })
        })
        .catch((err) => {
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

router.get('/:id', (req, res) => {
    id = req.params.id    
    getMeeting(id)
        .then((meeting) => {            
            res.json({ meeting })
        })
        .catch((err) => {            
            res.json(Error[{ message: err }])
        })
})

function addAttendeesMeeting(ids, insertedMeetingIds) {
    const attendeesMeetingData = []
    ids.forEach((id) => {
        attendeesMeetingData.push({ user_id: id, meeting_id: insertedMeetingIds[0] })
    })
    return postAttendeesMeetings(attendeesMeetingData)
}

function addAttendeesToUser(attendeeList) {
    const allAttendees = []
    attendeeList.forEach((attendee => {
        const { first_name, last_name, hourly_wage, id } = attendee        
        allAttendees.push(id ? [id] : createAttendee(first_name, last_name, hourly_wage))
    }))    
    return Promise.all(allAttendees).then((all) => {       
        return all.map(ids => ids[0])
    })
}

module.exports = router
