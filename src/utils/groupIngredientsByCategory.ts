import { TIngredient } from "../services/types/types";

const categoryOrderMap: Record<string, number> = {
  bun: 1,
  sauce: 2,
  main: 3,
}

export const groupIngredientsByCategory = (ingredientsList: TIngredient[]): ([string, TIngredient[]])[] => {
  const map = ingredientsList.reduce<Record<string, TIngredient[]>>((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item)
    return acc;
  }, {})

  return Object.entries<TIngredient[]>(map).sort((a, b) => categoryOrderMap[a[0]] - categoryOrderMap[b[0]])
}