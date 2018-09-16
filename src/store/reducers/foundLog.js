import { LOAD_LOG } from "../actionTypes";

const foundLog = (state = [], action) => {
  switch (action.type) {
    case LOAD_LOG:
      return action.foundLog;
    default:
      return state;
  }
};

export default foundLog;
