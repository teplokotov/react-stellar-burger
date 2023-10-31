export function getProp(ingredients, id, propName) {
  return ingredients.find((item) => item._id === id)[propName];
}

export function getIngredient(ingredients, id) {
  return ingredients.find((item) => item._id === id);
}
