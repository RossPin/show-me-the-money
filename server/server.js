var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')

var server = express()

const authRoute = require('./routes/auth')
const meetingsRoute = require('./routes/meetings')
const usersRoute = require('./routes/users')


server.use(cors('*'))

server.use(passport.initialize())
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))



server.use('/api/auth', authRoute)
server.use('/api/users', usersRoute)
server.use('/api/meetings', meetingsRoute)

module.exports = server
