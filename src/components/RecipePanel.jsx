import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientTranslations, translateBreadName, translateInstruction, translations } from '../i18n/translations';

function calculateIngredients(recipe, flourGrams, massaMadreGrams) {
  const ingredients = {};

  Object.entries(recipe.ingredients).forEach(([name, percent]) => {
    if (name === 'farinha') {
      return;
    }

    if (Array.isArray(percent)) {
      ingredients[name] = {
        isRange: true,
        percent,
        min: flourGrams * (percent[0] / 100),
        max: flourGrams * (percent[1] / 100),
      };
      return;
    }

    ingredients[name] = {
      isRange: false,
      percent,
      grams: flourGrams * (percent / 100),
    };
  });

  const ingredientSum = Object.values(ingredients).reduce((sum, ingredient) => {
    if (ingredient.isRange) {
      return sum + ingredient.max;
    }

    return sum + ingredient.grams;
  }, 0);

  const totalDough = flourGrams + ingredientSum + massaMadreGrams;
  const breads = recipe.breadWeight > 0 ? Math.floor(totalDough / recipe.breadWeight) : 0;
  const leftoverDough = recipe.breadWeight > 0 ? totalDough % recipe.breadWeight : 0;

  return {
    ingredients,
    totalDough,
    breads,
    leftoverDough,
  };
}

function RecipePanel({ bread, language }) {
  const [flourGrams, setFlourGrams] = useState(20000);
  const [massaMadre, setMassaMadre] = useState(80);
  const [calculation, setCalculation] = useState(null);

  const t = translations[language] || translations.pt;
  const ingredientLabels = ingredientTranslations[language] || ingredientTranslations.pt;
  const translatedBreadName = translateBreadName(bread, language);

  const handleCalculate = () => {
    setCalculation(calculateIngredients(bread, flourGrams, massaMadre));
  };

  useEffect(() => {
    setCalculation(null);
  }, [bread]);

  return (
    <section className="glass-card h-full p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-sky-700/70">{t.selectedRecipe}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{translatedBreadName}</h2>

      <div className="mt-6 rounded-2xl border border-white/60 bg-white/60 p-4">
        <h3 className="text-base font-semibold text-slate-800">{t.calculator}</h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">{t.flour} (g)</span>
            <input
              type="number"
              min="0"
              step="1"
              value={flourGrams}
              onChange={(event) => setFlourGrams(Number(event.target.value) || 0)}
              className="input-glass"
            />
          </label>

          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">{t.massaMadre} (g)</span>
            <input
              type="number"
              min="0"
              step="1"
              value={massaMadre}
              onChange={(event) => setMassaMadre(Number(event.target.value) || 0)}
              className="input-glass"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-4 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          {t.calculate}
        </button>
      </div>

      {calculation && (
        <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-4">
          <h3 className="text-base font-semibold text-slate-800">{t.ingredients}</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(calculation.ingredients).map(([name, ingredient]) => (
              <li key={name} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-sm">
                <span className="text-slate-700">
                  {ingredientLabels[name] || name}{' '}
                  {ingredient.isRange ? `(${ingredient.percent[0]}% - ${ingredient.percent[1]}%)` : `(${ingredient.percent}%)`}
                </span>
                <span className="font-semibold text-slate-900">
                  {ingredient.isRange
                    ? `${ingredient.min.toFixed(1)} g - ${ingredient.max.toFixed(1)} g`
                    : `${ingredient.grams.toFixed(1)} g`}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-50/70 px-3 py-2 text-sm">
              <span className="text-cyan-800">{t.massaMadre}</span>
              <span className="font-semibold text-cyan-900">{massaMadre.toFixed(1)} g</span>
            </li>
          </ul>

          <div className="mt-4 space-y-2 border-t border-white/70 pt-3 text-sm">
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">{t.totalDough}</span>
              <span className="font-semibold text-slate-900">{calculation.totalDough.toFixed(1)} g</span>
            </p>
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">{t.breadsProduced}</span>
              <span className="font-semibold text-slate-900">{calculation.breads}</span>
            </p>
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">{t.divisionPerBread}</span>
              <span className="font-semibold text-slate-900">{bread.breadWeight} g</span>
            </p>
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">{t.leftoverDough}</span>
              <span className="font-semibold text-slate-900">{calculation.leftoverDough.toFixed(1)} g</span>
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-amber-300/50 bg-amber-50/70 px-3 py-2 text-sm text-amber-900">
            {t.nextBatchStarter}: {calculation.leftoverDough.toFixed(1)} g.
            <br />
            {t.nextBatchTip}
          </div>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-4">
        <h3 className="text-base font-semibold text-slate-800">{t.preparationMode}</h3>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-700 md:text-base">
          {bread.instructions.map((step) => (
            <li key={step}>{translateInstruction(step, language)}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

RecipePanel.propTypes = {
  bread: PropTypes.shape({
    breadWeight: PropTypes.number.isRequired,
    ingredients: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
      ]),
    ).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  language: PropTypes.oneOf(['pt', 'en', 'es']).isRequired,
};

export default RecipePanel;
