import { TIngredient } from "../services/redux/types/types";

const categoryOrderMap: Record<TIngredient['type'], number> = {
  bun: 1,
  sauce: 2,
  main: 3,
}

type IngredientsMap = Record<TIngredient['type'], TIngredient[]>;
type ReturnType = [TIngredient['type'], TIngredient[]][];

export const groupIngredientsByCategory = (ingredientsList: TIngredient[]): ReturnType => {
  const map = ingredientsList.reduce<IngredientsMap>((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item)
    return acc;
  }, {} as IngredientsMap)

  return (Object.entries(map) as ReturnType).sort((a, b) => categoryOrderMap[a[0]] - categoryOrderMap[b[0]])
}