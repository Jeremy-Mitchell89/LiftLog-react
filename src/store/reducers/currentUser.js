import { SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user:{}
};

export default(state = DEFAULT_STATE, action) => {
  switch(action.type) {
      case SET_CURRENT_USER:
      return {
        //turns isauthenticated true if user is logged in
        isAuthenticated: Object.keys(action.user).length > 0,
        user:action.user
      };
      default:
      return state;
    }
}