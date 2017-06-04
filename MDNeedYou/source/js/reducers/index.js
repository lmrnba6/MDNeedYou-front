import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import business from "./businessReducer"
import auth from './auth';

export default combineReducers({
  tweets,
  user,
  business,
  auth
})
