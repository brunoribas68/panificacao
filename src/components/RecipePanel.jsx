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

function RecipePanel({ bread }) {
  const flourBase = 1000;
  const ingredientRows = Object.entries(bread.ingredients).map(([name, percentage]) => ({
    key: name,
    label: ingredientLabels[name] || name,
    percentage,
    grams: flourBase * (percentage / 100),
  }));

  return (
    <section className="glass-card h-full p-6 md:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-sky-700/70">Receita Selecionada</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{bread.name}</h2>

      <div className="mt-6 rounded-2xl border border-white/60 bg-white/60 p-4">
        <h3 className="text-base font-semibold text-slate-800">Ingredientes (base 1000g de farinha)</h3>
        <ul className="mt-3 space-y-2">
          {ingredientRows.map((item) => (
            <li key={item.key} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-sm">
              <span className="text-slate-700">{item.label} ({item.percentage}%)</span>
              <span className="font-semibold text-slate-900">{item.grams.toFixed(1)} g</span>
            </li>
          ))}
        </ul>
      </div>

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
    ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipePanel;
