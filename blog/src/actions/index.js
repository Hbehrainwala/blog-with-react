import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/api';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts/`);

  return {
    type: "FETCH_POSTS",
    payload: request
  };
}

export function createPost(values, headers, callback) {
  const request = axios.post(`${ROOT_URL}/posts/`, values, { headers })
    .then(() => callback());

  return {
    type: "CREATE_POST",
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}/`);

  return {
    type: "FETCH_POST",
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}/`)

  return {
    type: "DELETE_POST",
    payload: id
  }
}

export function loginUser(values, callback) {
  const request = axios.post(`${ROOT_URL}/login/`, values)
    // .then(() => callback());

  return {
    type: "LOGIN_USER",
    payload: request
  }
}

export function signupUser(values, callback) {
  const request = axios.post(`${ROOT_URL}/users/`, values)
    // .then(() => callback());

  return {
    type: "SIGNUP_USER",
    payload: request
  }
}

export function updatePost(id, values, headers, callback) {
  const request = axios.put(`${ROOT_URL}/posts/${id}/`, values, { headers })

  return {
    type : "UPDATE_POST",
    payload : request
  }
}

export function logoutUser(headers, callback) {
  const values = {}
  const request = axios.post(`${ROOT_URL}/logout/`, values, { headers })

  return {
    type : "LOGOUT_USER",
    payload : request
  }
}
export function fetchMyPost(headers, callback){
  const request = axios.get(`${ROOT_URL}/posts/mypost/`, { headers })

  return {
    type : "FETCH_MY_POST",
    payload : request
  }
}

export function fetchPublishPost(){
  const request = axios.get(`${ROOT_URL}/posts/publish_post/`)

  return{
    type : "FETCH_PUBLISH_POST",
    payload : request
  }
}
