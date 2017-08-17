import axios from "axios";
import includes from 'array-includes'
import jwt from 'jwt-simple';


var backendUrl = window.location.host;
backendUrl = backendUrl==='localhost:8080' ? 'http://localhost:8081' : 'https://mdneedyou.herokuapp.com';

export function fetchBusiness(city) {
  return function (dispatch) {
    const url = `${backendUrl}/mdneedyou/business/list/${city}`
    axios.get(url)
      .then((response) => {
        dispatch({ type: "CITY_BUSINESS_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "CITY_BUSINESS_REJECTED", payload: err })
      })
  }
}

export function getBusiness(id) {
  const url = `${backendUrl}/mdneedyou/business/${id}`
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
  const url = `${backendUrl}/mdneedyou/business/login`
  return dispatch => {
    return axios.post(url, data).then(res => {
      //const token = res.data.token;
      let token = jwt.encode(res.data, 'secret');
      localStorage.setItem('jwtToken', token);
      //setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data));
    },err => {
      dispatch(setCurrentUser(err));
    });
  }
}

export function updateBusiness(data) {
  const url = `${backendUrl}/mdneedyou/business/update`
  return dispatch => {
    return axios.post(url, data).then(res => {
      dispatch(setCurrentUser(res.data));
    });
  }
}



export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}));
  }
}

export function changeLanguage(lan) {
  return {
    type: 'CHANGE_LANGUAGE',
    lan
  };
}

export function setCurrentUser(business) {
  return {
    type: 'SET_CURRENT_USER',
    business
  };
}

export function filterBusiness(state) {
  return dispatch => {
    return axios.post(`${backendUrl}/mdneedyou/business/filterList`, state).then(res => {
      dispatch({ type: 'BUSINESS_FILTERED', payload: res.data });
    });
  }
}




