import { TIngredient } from "../services/types";

export function getProp(ingredients: TIngredient[], id: string, propName: string) {
  const ingredient = ingredients.find((item) => item._id === id);
  return ingredient && ingredient[propName as keyof typeof ingredient];
}

export function getIngredient(ingredients: TIngredient[], id: string) {
  return ingredients.find((item) => item._id === id);
}
