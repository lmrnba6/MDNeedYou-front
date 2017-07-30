import axios from "axios";
var backendUrl = window.location.host;
backendUrl = backendUrl==='localhost:8080' ? 'http://localhost:8081' : 'https://mdneedyou.herokuapp.com';

export function fetchHours(state) {
  const url = `${backendUrl}/mdneedyou/reservation/hours`
  return dispatch => {
    return axios.post(url, state).then(res => {
      dispatch({ type: 'BUSINESS_HOURS', payload: res.data });
    });
  }
}


export function schedule(state) {
  const url = `${backendUrl}/mdneedyou/reservation/schedule`
  return dispatch => {
    return axios.post(url, state).then(res => {
      dispatch({ type: 'RESERVATION_FULFILLED', payload: res.data });
    });
  }
}

export function getReservation(data) {
  return function (dispatch) {
    const url = `${backendUrl}/mdneedyou/reservation/getReservation/${data}`
    axios.get(url)
      .then((response) => {
        dispatch({ type: "RESERVATION_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "RESERVATION_REJECTED", payload: err })
      })
  }
}

export function deleteAppointment(event) {
  const url = `${backendUrl}/mdneedyou/reservation/delete`
  return dispatch => {
    return axios.post(url, event).then(res => {
      dispatch({ type: "RESERVATION_FULFILLED", payload: res.data })
    });
  }
}
