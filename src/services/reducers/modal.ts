import {
  OPEN_MODAL,
  CLOSE_MODAL,
  TModalActions
} from "../actions/modal";

type TInitialState = {
  isHidden: boolean;
  typeOfModal: string;
}

const initialState: TInitialState = {
  isHidden: true,
  typeOfModal: ''
};

export function modalReducer(state = initialState, action: TModalActions): TInitialState {
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
