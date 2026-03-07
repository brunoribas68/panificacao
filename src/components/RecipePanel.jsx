import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ingredientLabels = {
  farinha: 'Farinha',
  sal: 'Sal',
  reforcador: 'Reforçador',
  fermento: 'Fermento',
  agua: 'Água',
  acucar: 'Açúcar',
  gordura: 'Gordura',
  leitePo: 'Leite em pó',
  manteiga: 'Manteiga',
};

function calculateIngredients(recipe, flourGrams, massaMadreGrams) {
  const ingredients = {};

  Object.entries(recipe.ingredients).forEach(([name, percent]) => {
    if (name === 'farinha') {
      return;
    }

    ingredients[name] = flourGrams * (percent / 100);
  });

  const ingredientSum = Object.values(ingredients).reduce((sum, value) => sum + value, 0);
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

function RecipePanel({ bread }) {
  const [flourGrams, setFlourGrams] = useState(20000);
  const [massaMadre, setMassaMadre] = useState(80);
  const [calculation, setCalculation] = useState(null);

  const handleCalculate = () => {
    setCalculation(calculateIngredients(bread, flourGrams, massaMadre));
  };

  useEffect(() => {
    setCalculation(null);
  }, [bread]);

  return (
    <section className="glass-card h-full p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-sky-700/70">Receita Selecionada</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{bread.name}</h2>

      <div className="mt-6 rounded-2xl border border-white/60 bg-white/60 p-4">
        <h3 className="text-base font-semibold text-slate-800">Calculadora</h3>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm font-medium text-slate-700">Farinha (g)</span>
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
            <span className="text-sm font-medium text-slate-700">Massa madre (g)</span>
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
          Calcular
        </button>
      </div>

      {calculation && (
        <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-4">
          <h3 className="text-base font-semibold text-slate-800">Ingredientes</h3>
          <ul className="mt-3 space-y-2">
            {Object.entries(calculation.ingredients).map(([name, grams]) => (
              <li key={name} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-sm">
                <span className="text-slate-700">
                  {ingredientLabels[name] || name} ({bread.ingredients[name]}%)
                </span>
                <span className="font-semibold text-slate-900">{grams.toFixed(1)} g</span>
              </li>
            ))}
            <li className="flex items-center justify-between rounded-xl border border-cyan-300/40 bg-cyan-50/70 px-3 py-2 text-sm">
              <span className="text-cyan-800">Massa madre</span>
              <span className="font-semibold text-cyan-900">{massaMadre.toFixed(1)} g</span>
            </li>
          </ul>

          <div className="mt-4 space-y-2 border-t border-white/70 pt-3 text-sm">
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Massa total</span>
              <span className="font-semibold text-slate-900">{calculation.totalDough.toFixed(1)} g</span>
            </p>
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Pães produzidos</span>
              <span className="font-semibold text-slate-900">{calculation.breads}</span>
            </p>
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Divisão por pão</span>
              <span className="font-semibold text-slate-900">{bread.breadWeight} g</span>
            </p>
            <p className="flex items-center justify-between text-slate-700">
              <span className="font-medium">Sobra de massa</span>
              <span className="font-semibold text-slate-900">{calculation.leftoverDough.toFixed(1)} g</span>
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-amber-300/50 bg-amber-50/70 px-3 py-2 text-sm text-amber-900">
            Massa madre para próxima fornada: {calculation.leftoverDough.toFixed(1)} g.
            <br />
            Guarde essa massa como massa madre para a próxima fornada.
          </div>
        </div>
      )}

      <div className="mt-5 rounded-2xl border border-white/60 bg-white/60 p-4">
        <h3 className="text-base font-semibold text-slate-800">Modo de fazer</h3>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-700 md:text-base">
          {bread.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

RecipePanel.propTypes = {
  bread: PropTypes.shape({
    breadWeight: PropTypes.number.isRequired,
    ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipePanel;
