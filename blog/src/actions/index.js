import axios from 'axios';
import { FETCH_POSTS ,CREATE_POST, FETCH_POST, DELETE_POST, FETCH_MY_POST, FETCH_PUBLISH_POST,
   LOGIN_USER, SIGNUP_USER, UPDATE_POST, LOGOUT_USER,
   FETCH_MY_PUBLISH_POST, FETCH_MY_UNPUBLISH_POST,
 FETCH_MY_ARCHIVE_POST } from "../constant"

const ROOT_URL = 'http://localhost:8000/api';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts/`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, headers, callback) {
  const request = axios.post(`${ROOT_URL}/posts/`, values, { headers })
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}/`);

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}/`)

  return {
    type: DELETE_POST,
    payload: id
  }
}

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

export function updatePost(id, values, headers, callback) {
  const request = axios.put(`${ROOT_URL}/posts/${id}/`, values, { headers })

  return {
    type : UPDATE_POST,
    payload : request
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
export function fetchMyPost(headers, callback){
  const request = axios.get(`${ROOT_URL}/posts/mypost/`, { headers })

  return {
    type : FETCH_MY_POST,
    payload : request
  }
}

export function fetchPublishPost(){
  const request = axios.get(`${ROOT_URL}/posts/publish_post/`)

  return{
    type : FETCH_PUBLISH_POST,
    payload : request
  }
}

export function fetchMyPublishPost(headers, callback){
  const request = axios.get(`${ROOT_URL}/posts/mypubishpost/`, { headers })

  return{
    type : FETCH_MY_PUBLISH_POST,
    payload : request
  }
}

export function fetchMyUnpublishPost(headers, callback){
  const request = axios.get(`${ROOT_URL}/posts/myunpubishpost/`, { headers })

  return{
    type : FETCH_MY_UNPUBLISH_POST,
    payload : request
  }
}

export function fetchMyArchivePost(headers, callback){
  const request = axios.get(`${ROOT_URL}/posts/myarchivepost/`, { headers })

  return{
    type : FETCH_MY_ARCHIVE_POST,
    payload : request
  }
}
