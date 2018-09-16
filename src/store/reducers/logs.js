import { LOAD_LOGS, REMOVE_LOG } from "../actionTypes";

const logs = (state = [], action) => {
  switch (action.type) {
    case LOAD_LOGS:
      return [...action.logs];
    case REMOVE_LOG:
      return state.filter(log => log._id !== action.id);
    default:
      return state;
  }
};

export default logs;
