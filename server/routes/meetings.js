const router = require('express').Router()

const {postMeeting} = require('../db/meetings')


router.post('/', (req, res) => {
    console.log(req.body)
    let meeting = req.body.meeting
    postMeeting(meeting)
    .then((meeting) => {
        console.log(meeting)
    })
})







module.exports = router