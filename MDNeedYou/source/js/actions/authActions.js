import axios from 'axios';
import setAuthorizationToken from '../components/utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(business) {
  return {
    type: 'SET_CURRENT_USER',
    business
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    //setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('http://localhost:8081/mdneedyou/business/login', data).then(res => {
      //const token = res.data.token;
      //localStorage.setItem('jwtToken', res.data);
      //setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data.business));
    });
  }
}
