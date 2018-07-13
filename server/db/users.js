var hash = require('../auth/hash')

const conn = require('./connection')

function createUser(user_name, first_name, last_name, hourly_wage, password, testDb) {
  const db = testDb || conn
  return new Promise((resolve, reject) => {
    hash.generate(password, (err, hash) => {
      if (err) reject(err)
      db('users')
        .insert({ user_name, first_name, last_name, hourly_wage, hash })
        .then(user_id => resolve(user_id))
        .catch(err => reject(err))
    })
  })
}

function createAttendee(first_name, last_name, hourly_wage, testDb) {
  console.log(first_name, last_name, hourly_wage)
  const db = testDb || conn
  return db('users')
  .insert({first_name, last_name, hourly_wage})
}


function userExists(user_name, testDb) {
  const db = testDb || conn
  return db('users')
    .where('user_name', user_name)
    .first()
}

function getUserByName(user_name, testDb) {
  const db = testDb || conn
  return db('users')
    .where('user_name', user_name)
    .first()
}

function getUsers(testDb) {
  const db = testDb || conn
  return db('users')
    .select()
}

module.exports = {
  createUser,
  userExists,
  getUserByName,
  getUsers,
  createAttendee
}
