import {
  ADD_INGREDIENT_TO_CART,
  REMOVE_INGREDIENT_FROM_CART,
  ADD_BUN_TO_CART,
  CLEAR_CART,
  MOVE_INGREDIENT_INSIDE_CART
} from "../actions/cart";

const initialState = {
  cart: {
    bun: null,
    fillings: [],
  },
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CART: {
      return {
        ...state,
        cart: {
          bun: state.cart.bun,
          fillings: [...state.cart.fillings, action.id],
        },
      };
    }
    case REMOVE_INGREDIENT_FROM_CART: {
      return {
        ...state,
        cart: {
          bun: state.cart.bun,
          fillings: [...state.cart.fillings.slice(0, action.index), ...state.cart.fillings.slice(action.index + 1)],
        },
      };
    }
    case ADD_BUN_TO_CART: {
      return {
        ...state,
        cart: {
          bun: action.id,
          fillings: [...state.cart.fillings],
        },
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        cart: {
          bun: null,
          fillings: [],
        },
      };
    }
    case MOVE_INGREDIENT_INSIDE_CART: {
      const fillings = [...state.cart.fillings];
      fillings.splice(action.toIndex, 0, fillings.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        cart: {
          bun: state.cart.bun,
          fillings: fillings,
        },
      };
    }
    default: {
      return state;
    }
  }
};
