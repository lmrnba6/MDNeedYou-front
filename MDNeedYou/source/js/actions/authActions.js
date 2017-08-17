import axios from 'axios';
import setAuthorizationToken from '../components/utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';

var backendUrl = window.location.host;
backendUrl = backendUrl==='localhost:8080' ? 'http://localhost:8081' : 'https://mdneedyou.herokuapp.com';

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
  const url = `${backendUrl}/mdneedyou/business/login`
  return dispatch => {
    return axios.post(url, data).then(res => {
      //const token = res.data.token;
      var cert = fs.readFileSync('private.key');  // get private key 
      var token = jwt.sign({ business: res.data.business }, cert, { algorithm: 'RS256'});
      localStorage.setItem('jwtToken', token);
      //setAuthorizationToken(token);
      dispatch(setCurrentUser(res.data.business));
    });
  }
}
