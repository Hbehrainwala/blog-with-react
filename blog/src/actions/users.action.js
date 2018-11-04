import axios from 'axios';
import { LOGIN_USER, SIGNUP_USER, LOGOUT_USER } from "../constant"

const ROOT_URL = 'http://localhost:8000/api';

export function loginUser(values, callback) {
  const request = axios.post(`${ROOT_URL}/login/`, values)
    // .then(() => callback());

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function signupUser(values, callback) {
  const request = axios.post(`${ROOT_URL}/users/`, values)
    // .then(() => callback());

  return {
    type: SIGNUP_USER,
    payload: request
  }
}

export function logoutUser(headers, callback) {
  const values = {}
  const request = axios.post(`${ROOT_URL}/logout/`, values, { headers })

  return {
    type : LOGOUT_USER,
    payload : request
  }
}
