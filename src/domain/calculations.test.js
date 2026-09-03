import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFlourFactor,
  calculateIngredients,
  normalizeRecipe,
} from './calculations.js';

test('normalizeRecipe padroniza aliases e converte hidratação fixa em faixa', () => {
  const normalized = normalizeRecipe({
    id: 'sample',
    breadWeight: 100,
    ingredients: {
      farinha: 100,
      agua: 60,
      fermentoFresco: 3,
      melhorador: 1,
      ovo: 5,
    },
  });

  assert.deepEqual(normalized.ingredients.agua, [60, 60]);
  assert.equal(normalized.ingredients.fermento, 3);
  assert.equal(normalized.ingredients.reforcador, 1);
  assert.equal(normalized.ingredients.ovos, 5);
});

test('calculateIngredients calcula total, rendimento e sobra com faixa', () => {
  const recipe = {
    breadWeight: 250,
    ingredients: {
      farinha: 100,
      sal: 2,
      agua: [58, 60],
      fermento: 1,
    },
  };

  const result = calculateIngredients(recipe, 1000, 100);

  assert.equal(result.ingredients.sal.grams, 20);
  assert.equal(result.ingredients.agua.min, 580);
  assert.equal(result.ingredients.agua.max, 600);
  assert.equal(result.totalDough, 1730);
  assert.equal(result.breads, 6);
  assert.equal(result.leftoverDough, 230);
});

test('calculateFlourFactor usa percentual máximo para ingredientes em faixa', () => {
  const recipe = {
    ingredients: {
      farinha: 100,
      sal: 2,
      agua: [58, 60],
      fermento: 1,
    },
  };

  assert.equal(calculateFlourFactor(recipe), 1.63);
});
