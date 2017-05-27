import axios from "axios";

export default function fetchBusiness() {
  return function(dispatch) {

    axios.get("http://localhost:8081/mdneedyou/user/list")
      .then((response) => {
        dispatch({type: "FETCH_BUSINESS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BUSINESS_REJECTED", payload: err})
      })
  }
}

