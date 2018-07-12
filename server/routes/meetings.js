const router = require('express').Router()

const { postMeeting, getMeetings } = require('../db/meetings')


router.post('/', (req, res) => {

    let meeting = req.body
    delete meeting.attendee_list 

    postMeeting(meeting)
        .then((insertedMeetingIds) => {
            meeting.id = insertedMeetingIds[0] // inserting meeting id before return
            res.json({ meeting })
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


module.exports = router
