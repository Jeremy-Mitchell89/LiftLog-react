import { LOAD_LOG, REMOVE_MOVEMENT } from "../actionTypes";

const foundLog = (state = [], action) => {
  switch (action.type) {
    case LOAD_LOG:
      return action.foundLog;
    case REMOVE_MOVEMENT:
      return {
        _id: state._id,
        title: state.title,
        notes: state.notes,
        date: state.date,
        user: state.user,
        _v: state._v,
        movements: state.movements.filter(move => move._id !== action.id)
      };
    default:
      return state;
  }
};

export default foundLog;
