import axios from "axios";

export function fetchBusiness(city) {
  return function(dispatch) {

    axios.get("http://localhost:8081/mdneedyou/business/list/"+city)
      .then((response) => {
        dispatch({type: "FETCH_BUSINESS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BUSINESS_REJECTED", payload: err})
      })
  }
}

export function getBusiness(id) {
  const url = "http://localhost:8081/mdneedyou/business/"+id;
  return function(dispatch) {

    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_BUSINESS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BUSINESS_REJECTED", payload: err})
      })
  }
}



