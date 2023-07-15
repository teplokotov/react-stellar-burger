export function getProp(ingredients, id, propName) {
  return ingredients.find((item) => item._id === id)[propName];
}
