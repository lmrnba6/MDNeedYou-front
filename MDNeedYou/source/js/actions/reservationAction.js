import axios from "axios";

export function fetchHours(state) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/reservation/hours', state).then(res => {
      dispatch({ type: 'BUSINESS_HOURS', payload: res.data });
    });
  }
}


export function schedule(state) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/reservation/schedule', state).then(res => {
      dispatch({ type: 'BUSINESS_SCHEDULE', payload: res.data });
    });
  }
}