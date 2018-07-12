const { postMeeting, getMeetings } = require('../../server/db/meetings')
const { getUsers } = require('../../server/db/users')
const request = require('supertest')

const env = require('./test-environment')
// const greetingsDb = require('../../server/db/greeting')

// Manage the test database

let testDb = null
beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})
afterEach(() => env.cleanup(testDb))

// Tests

test('post meeting db func returns an array with an id', () => {
  const meeting = {
    meeting_name: 'potatoes',
    duration: 4000,
    attendees: 9001,
    cost: 9002
  }
  postMeeting(meeting, testDb)
    .then(array => {
      expect(array.length).toBe(1)
    })
})



test('get meetings db returns an array', () => {
  const meetings = [
    {
      id: 4,
      meeting_name: 'potatoes',
      duration: 4000,
      attendees: 9001,
      cost: 9002
    }
  ]
  getMeetings(testDb)
    .then(array => {
      expect(array.length).toBe(1)
    })
})



test('get users db returns an array', () => {
  const users = [
    {
      id: 1,
      user_name: 'potatoes',
      first_name: 'fourthousandandone',
      last_name: 'ninethousandsandone',
      hourly_wage: 12,
      hash: "kdurmchfdkldh73jr74j73jkfg"
    }
  ]
  getUsers(testDb)
    .then(array => {
      expect(array.length).toBe(1)
    })
})
