import {combineReducers} from 'redux'

import auth from './auth'
import currentMeeting from './currentMeeting'
import meetings from './meetings'
import users from './users'

export default combineReducers({
  auth,
  currentMeeting,
  meetings,
  users
})
