import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Calculator from '../components/Calculator';
import { recipes } from '../data/recipes';

function CalculatorPage() {
  const { breadName } = useParams();
  const [flourGrams, setFlourGrams] = useState(500);
  const [massaMadre, setMassaMadre] = useState(0);

  const recipe = useMemo(
    () => recipes.find((item) => item.name === decodeURIComponent(breadName || '')),
    [breadName],
  );

  if (!recipe) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-card max-w-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Receita não encontrada</h1>
          <Link to="/" className="mt-4 inline-block rounded-xl bg-white/70 px-5 py-2 font-medium text-slate-800 transition hover:bg-white">
            Voltar para início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10 md:px-8">
      <div className="mx-auto w-full">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-700/70">Calculadora</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-5xl">{recipe.name}</h1>
          <Link to="/" className="mt-4 inline-block rounded-xl bg-white/70 px-5 py-2 font-medium text-slate-800 transition hover:bg-white">
            ← Trocar pão
          </Link>
        </div>

        <section className="glass-card mx-auto mb-6 grid w-full max-w-3xl gap-5 p-6 md:grid-cols-2 md:p-8">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Quantidade de farinha ou pré-mistura (g)</span>
            <input
              type="number"
              min="0"
              step="1"
              value={flourGrams}
              onChange={(event) => setFlourGrams(Number(event.target.value) || 0)}
              className="input-glass"
            />
          </label>

          <label className="space-y-2">
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
        </section>

        <Calculator recipe={recipe} flourGrams={flourGrams} massaMadre={massaMadre} />
      </div>
    </main>
  );
}

export default CalculatorPage;
