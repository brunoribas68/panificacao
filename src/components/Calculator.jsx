import { useMemo } from 'react';
import PropTypes from 'prop-types';

const formatName = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();

function Calculator({ recipe, flourGrams, massaMadre }) {
  const { ingredientResults, doughWeight, breadsProduced } = useMemo(() => {
    const ingredientResults = Object.entries(recipe.ingredients).map(([name, percentage]) => ({
      name,
      percentage,
      grams: flourGrams * (percentage / 100),
    }));

    const doughWeight = flourGrams + ingredientResults.reduce((total, ingredient) => total + ingredient.grams, 0) + massaMadre;

    const breadsProduced = recipe.yieldWeight > 0 ? Math.floor(doughWeight / recipe.yieldWeight) : 0;

    return { ingredientResults, doughWeight, breadsProduced };
  }, [flourGrams, massaMadre, recipe]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <section className="glass-card p-6 md:p-8">
        <h2 className="text-lg font-semibold text-slate-800 md:text-xl">Ingredientes calculados</h2>
        <ul className="mt-4 space-y-3">
          {ingredientResults.map((ingredient) => (
            <li key={ingredient.name} className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3">
              <span className="text-slate-700">
                {formatName(ingredient.name)} ({ingredient.percentage}%)
              </span>
              <span className="font-semibold text-sky-800">{ingredient.grams.toFixed(1)} g</span>
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
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Peso total da massa</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{(doughWeight / 1000).toFixed(2)} kg</p>
        </article>

        <article className="glass-card p-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Pães produzidos</p>
          <p className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{breadsProduced}</p>
          <p className="mt-1 text-sm text-slate-500">Peso unitário: {recipe.yieldWeight} g</p>
        </article>
      </section>
    </div>
  );
}

Calculator.propTypes = {
  recipe: PropTypes.shape({
    yieldWeight: PropTypes.number.isRequired,
    ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
  }).isRequired,
  flourGrams: PropTypes.number.isRequired,
  massaMadre: PropTypes.number.isRequired,
};

export default Calculator;
