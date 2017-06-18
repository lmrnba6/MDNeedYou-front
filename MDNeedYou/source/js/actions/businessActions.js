import axios from "axios";
import { SET_CURRENT_USER } from './types';
import includes from 'array-includes'

export function fetchBusiness(city) {
  return function (dispatch) {

    axios.get("http://localhost:8081/mdneedyou/business/list/" + city)
      .then((response) => {
        dispatch({ type: "CITY_BUSINESS_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "CITY_BUSINESS_REJECTED", payload: err })
      })
  }
}

export function getBusiness(id) {
  const url = "http://localhost:8081/mdneedyou/business/" + id;
  return function (dispatch) {

    axios.get(url)
      .then((response) => {
        dispatch({ type: "ID_BUSINESS_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "ID_BUSINESS_REJECTED", payload: err })
      })
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/business/login', data).then(res => {
      //const token = res.data.token;
      //localStorage.setItem('jwtToken', token);
      //setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data));
    });
  }
}

export function updateBusiness(data) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/business/update', data).then(res => {
      dispatch({ type: 'BUSINESS_UPDATED', payload: res.data });
    });
  }
}



export function logout() {
  return dispatch => {
    //localStorage.removeItem('jwtToken');
    //setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function setCurrentUser(business) {
  return {
    type: SET_CURRENT_USER,
    business
  };
}

export function filterBusiness(state) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/business/filterList', state).then(res => {
      dispatch({ type: 'BUSINESS_FILTERED', payload: res.data });
    });
  }
}




