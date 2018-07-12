const router = require('express').Router()

const { getUsers } = require('../db/users')

router.get('/', (req, res) => {
    getUsers()
        .then((users) => {
            res.json({ users })
        })
        .catch((err) => {
            res.json(Error[{ message: err }])
        })
})

module.exports = router


