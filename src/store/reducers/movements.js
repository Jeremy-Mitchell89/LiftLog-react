import { REMOVE_MOVEMENT } from "../actionTypes";

const movements = (state = [""], action) => {
  switch (action.type) {
    case REMOVE_MOVEMENT:
      return [];
    default:
      return state;
  }
};

export default movements;
