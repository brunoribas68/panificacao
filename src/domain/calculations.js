const INGREDIENT_ALIASES = {
  melhorador: 'reforcador',
  fermentoFresco: 'fermento',
  ovo: 'ovos',
};

const RANGE_INGREDIENTS = new Set(['agua', 'leiteIntegral']);

const toPositiveNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : 0;
};

const normalizePercentageValue = (name, value) => {
  if (Array.isArray(value)) {
    const min = toPositiveNumber(value[0]);
    const max = toPositiveNumber(value[1]);
    return min <= max ? [min, max] : [max, min];
  }

  const numericValue = toPositiveNumber(value);
  if (RANGE_INGREDIENTS.has(name)) {
    return [numericValue, numericValue];
  }

  return numericValue;
};

const normalizeIngredients = (ingredients) => {
  const normalized = {};

  Object.entries(ingredients).forEach(([rawName, rawValue]) => {
    const name = INGREDIENT_ALIASES[rawName] || rawName;
    const value = normalizePercentageValue(name, rawValue);

    if (normalized[name] == null) {
      normalized[name] = value;
      return;
    }

    if (Array.isArray(normalized[name]) || Array.isArray(value)) {
      const current = Array.isArray(normalized[name]) ? normalized[name] : [normalized[name], normalized[name]];
      const next = Array.isArray(value) ? value : [value, value];
      normalized[name] = [current[0] + next[0], current[1] + next[1]];
      return;
    }

    normalized[name] += value;
  });

  return normalized;
};

export const normalizeRecipe = (recipe) => ({
  ...recipe,
  ingredients: normalizeIngredients(recipe.ingredients),
});

export const normalizeRecipes = (recipes) => recipes.map(normalizeRecipe);

export function calculateIngredients(recipe, flourGrams, massaMadreGrams) {
  const fg = flourGrams > 0 ? flourGrams : 0;
  const mm = massaMadreGrams > 0 ? massaMadreGrams : 0;

  if (!recipe || fg === 0) {
    return { ingredients: {}, totalDough: mm, breads: 0, leftoverDough: mm };
  }

  const ingredients = {};

  Object.entries(recipe.ingredients).forEach(([name, percent]) => {
    if (name === 'farinha') return;

    if (Array.isArray(percent)) {
      ingredients[name] = {
        isRange: true,
        percent,
        min: fg * (percent[0] / 100),
        max: fg * (percent[1] / 100),
      };
      return;
    }

    ingredients[name] = {
      isRange: false,
      percent,
      grams: fg * (percent / 100),
    };
  });

  const ingredientSum = Object.values(ingredients).reduce(
    (sum, ingredient) => sum + (ingredient.isRange ? ingredient.max : ingredient.grams),
    0,
  );

  const totalDough = fg + ingredientSum + mm;
  const breads = recipe.breadWeight > 0 ? Math.floor(totalDough / recipe.breadWeight) : 0;
  const leftoverDough = recipe.breadWeight > 0 ? totalDough % recipe.breadWeight : 0;

  return { ingredients, totalDough, breads, leftoverDough };
}

export function calculateFlourFactor(recipe) {
  if (!recipe) return 1;

  const percentSum = Object.entries(recipe.ingredients).reduce((sum, [name, percent]) => {
    if (name === 'farinha') return sum;
    return sum + (Array.isArray(percent) ? percent[1] : percent);
  }, 0);

  return 1 + (percentSum / 100);
}
