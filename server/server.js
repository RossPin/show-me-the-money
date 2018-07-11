var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')

var server = express()

const authRoute = require('./routes/auth')

server.use(cors('*'))

server.use(passport.initialize())
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))



server.use('/api/auth', authRoute)

module.exports = server
