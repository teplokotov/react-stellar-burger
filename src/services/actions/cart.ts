export const ADD_INGREDIENT_TO_CART: 'ADD_INGREDIENT_TO_CART' = "ADD_INGREDIENT_TO_CART";
export const REMOVE_INGREDIENT_FROM_CART: 'REMOVE_INGREDIENT_FROM_CART' = "REMOVE_INGREDIENT_FROM_CART";
export const ADD_BUN_TO_CART: 'ADD_BUN_TO_CART' = "ADD_BUN_TO_CART";
export const CLEAR_CART: 'CLEAR_CART' = "CLEAR_CART";
export const MOVE_INGREDIENT_INSIDE_CART: 'MOVE_INGREDIENT_INSIDE_CART' = "MOVE_INGREDIENT_INSIDE_CART";

export interface IAddIngredientToCartAction {
  uuid: string;
  id: number;
  readonly type: typeof ADD_INGREDIENT_TO_CART;
}

export interface IRemoveIngredientFromCartAction {
  index: number;
  readonly type: typeof REMOVE_INGREDIENT_FROM_CART;
}

export interface IAddBunToCartAction {
  uuid: string;
  id: number;
  readonly type: typeof ADD_BUN_TO_CART;
}

export interface ICleanCartAction {
  readonly type: typeof CLEAR_CART;
}

export interface IMoveIngredientInsideCartAction {
  toIndex: number;
  fromIndex: number;
  readonly type: typeof MOVE_INGREDIENT_INSIDE_CART;
}

export type TCartActions =
    IAddIngredientToCartAction
  | IRemoveIngredientFromCartAction
  | IAddBunToCartAction
  | ICleanCartAction
  | IMoveIngredientInsideCartAction;
