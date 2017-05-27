import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import business from "./businessReducer"

export default combineReducers({
  tweets,
  user,
  business,
})
