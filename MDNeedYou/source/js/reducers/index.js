import { combineReducers } from "redux"


import business from "./businessReducer";
import businessList from "./businessListReducer";
import auth from './auth';
import hours from './hoursReducer';
import reservation from './reservationReducer';

export default combineReducers({
  hours,
  business,
  businessList,
  reservation,
  auth
})
