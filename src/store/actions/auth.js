import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
export function updateUser(id, userinfo) {
  return dispatch => {
    return apiCall("put", `/api/users/${id}`, userinfo)
      .then(res => {
        dispatch(setCurrentUser(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
}
export function getUserStats(id) {
  return dispatch => {
    return apiCall("get", `/api/users/${id}`).then(res => {
      localStorage.setItem("userInfo", JSON.stringify(res));
      dispatch(setCurrentUser(res));
    });
  };
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
