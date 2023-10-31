import {
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions/modal";

const initialState = {
  isHidden: true,
  typeOfModal: ''
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        isHidden: false,
        typeOfModal: action.typeOfModal,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        isHidden: true,
      };
    }
    default: {
      return state;
    }
  }
};
