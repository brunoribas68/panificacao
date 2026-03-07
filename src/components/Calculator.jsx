import { useMemo } from 'react';
import PropTypes from 'prop-types';

const formatName = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();

function Calculator({ recipe, flourGrams, massaMadre }) {
  const { ingredientResults, totalDough, breadsProduced } = useMemo(() => {
    const ingredientResults = Object.entries(recipe.ingredients).map(([name, percentage]) => {
      if (Array.isArray(percentage)) {
        const min = flourGrams * (percentage[0] / 100);
        const max = flourGrams * (percentage[1] / 100);

        return {
          name,
          percentage,
          isRange: true,
          min,
          max,
        };
      }

      return {
        name,
        percentage,
        isRange: false,
        grams: flourGrams * (percentage / 100),
      };
    });

    const ingredientsSum = ingredientResults.reduce((sum, ingredient) => {
      if (ingredient.isRange) {
        return sum + ingredient.max;
      }

      return sum + ingredient.grams;
    }, 0);

    const totalDough = flourGrams + ingredientsSum + massaMadre;
    const breadsProduced = recipe.breadWeight > 0 ? Math.floor(totalDough / recipe.breadWeight) : 0;

    return { ingredientResults, totalDough, breadsProduced };
  }, [flourGrams, massaMadre, recipe]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <section className="glass-card p-6 md:p-8">
        <h2 className="text-lg font-semibold text-slate-800 md:text-xl">Ingredientes calculados (gramas)</h2>
        <ul className="mt-4 space-y-3">
          {ingredientResults.map((ingredient) => (
            <li key={ingredient.name} className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3">
              <span className="text-slate-700">
                {formatName(ingredient.name)}{' '}
                {ingredient.isRange ? `(${ingredient.percentage[0]}% - ${ingredient.percentage[1]}%)` : `(${ingredient.percentage}%)`}
              </span>
              <span className="font-semibold text-sky-800">
                {ingredient.isRange ? `${ingredient.min.toFixed(1)} g - ${ingredient.max.toFixed(1)} g` : `${ingredient.grams.toFixed(1)} g`}
              </span>
            </li>
          ))}
          <li className="flex items-center justify-between rounded-2xl border border-cyan-300/40 bg-cyan-50/70 px-4 py-3">
            <span className="text-cyan-800">Massa madre</span>
            <span className="font-semibold text-cyan-900">{massaMadre.toFixed(1)} g</span>
          </li>
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="glass-card p-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Massa total (gramas)</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{totalDough.toFixed(1)} g</p>
        </article>

        <article className="glass-card p-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Quantidade de pães</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{breadsProduced}</p>
          <p className="mt-1 text-sm text-slate-500">Peso unitário: {recipe.breadWeight} g</p>
        </article>
      </section>

      <section className="glass-card p-6 md:p-8">
        <h3 className="text-lg font-semibold text-slate-800">Instruções da receita</h3>
        <ol className="mt-4 list-inside list-decimal space-y-2 text-slate-700">
          {recipe.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

Calculator.propTypes = {
  recipe: PropTypes.shape({
    breadWeight: PropTypes.number.isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    ingredients: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
      ]),
    ).isRequired,
  }).isRequired,
  flourGrams: PropTypes.number.isRequired,
  massaMadre: PropTypes.number.isRequired,
};

export default Calculator;
