import { apiCall } from "../../services/api";
import { addError } from "./errors";
import {
  LOAD_LOGS,
  REMOVE_LOG,
  LOAD_LOG,
  REMOVE_MOVEMENT
} from "../actionTypes";

export const loadLogs = logs => ({
  type: LOAD_LOGS,
  logs
});

export const remove = id => ({
  type: REMOVE_LOG,
  id
});

export const loadLog = foundLog => ({
  type: LOAD_LOG,
  foundLog
});

export const removeMove = id => ({
  type: REMOVE_MOVEMENT,
  id
});

export const removeLog = (user_id, log_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/logs/${log_id}`)
      .then(() => dispatch(remove(log_id)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchLogs = () => {
  return dispatch => {
    return apiCall("get", "/api/logs")
      .then(res => dispatch(loadLogs(res)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const fetchOneLog = (user_id, log_id) => {
  return dispatch => {
    return apiCall("get", `/api/users/${user_id}/logs/${log_id}`)
      .then(res => dispatch(loadLog(res)))
      .catch(err => dispatch(addError(err.message)));
  };
};

export const postNewLog = (title, notes, date) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/logs`, { title, notes, date })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};

export const removeMovement = (user_id, log_id, movementid) => {
  return dispatch => {
    return apiCall(
      "delete",
      `/api/users/${user_id}/logs/${log_id}/movements/${movementid}`
    )
      .then(() => dispatch(removeMove(movementid)))
      .catch(err => dispatch(addError(err.message)));
  };
};
