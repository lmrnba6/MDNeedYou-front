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
      dispatch({ type: 'RESERVATION_FULFILLED', payload: res.data });
    });
  }
}

export function getReservation(data) {
  return function (dispatch) {

    axios.get("http://localhost:8081/mdneedyou/reservation/getReservation/"+ data)
      .then((response) => {
        dispatch({ type: "RESERVATION_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "RESERVATION_REJECTED", payload: err })
      })
  }
}

export function deleteAppointment(event) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/reservation/delete', event).then(res => {
      dispatch({ type: "RESERVATION_FULFILLED", payload: res.data })
    });
  }
}
