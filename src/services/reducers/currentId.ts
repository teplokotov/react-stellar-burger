import {
  SET_CURRENT_ID,
} from "../actions/currentId";

const initialState = {
  currentId: '',
};

export function currentIdReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ID: {
      return {
        ...state,
        currentId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
