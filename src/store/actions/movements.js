import { apiCall } from "../../services/api";
import { addError } from "./errors";
// import { REMOVE_MOVEMENT } from "../actionTypes";

// export const remove = id => ({
//   type: REMOVE_MOVEMENT,
//   id
// });

export const postNewMovement = (title, weight, reps) => (
  dispatch,
  getState
) => {
  let { currentUser, foundLog } = getState();
  const id = currentUser.user.id;
  const logid = foundLog._id;
  return apiCall("post", `/api/users/${id}/logs/${logid}/movements`, {
    title,
    weight,
    reps
  })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};

// export const removeMovement = (user_id, log_id, movementid) => {
//   return dispatch => {
//     return apiCall(
//       "delete",
//       `/api/users/${user_id}/logs/${log_id}/movements/${movementid}`
//     )
//       .then(() => dispatch(remove(movementid)))
//       .catch(err => dispatch(addError(err.message)));
//   };
// };
