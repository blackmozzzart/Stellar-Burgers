const categoryOrderMap = {
  bun: 1,
  sauce: 2,
  main: 3,
}

export const groupIngredientsByCategory = (ingredientsList) => {
  const map = ingredientsList.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item)
    return acc;
  }, {})

  return Object.entries(map).sort((a, b) => categoryOrderMap[a[0]] - categoryOrderMap[b[0]])
}
