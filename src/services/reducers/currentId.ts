import {
  SET_CURRENT_ID, TCurrentIdActions,
} from '../actions/currentId';

type TInitialState = {
  currentId: '' | number;
}

const initialState: TInitialState = {
  currentId: '',
};

export function currentIdReducer(state = initialState, action: TCurrentIdActions): TInitialState {
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
