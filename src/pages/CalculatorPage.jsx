import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Calculator from '../components/Calculator';
import { recipes } from '../data/recipes';

function CalculatorPage() {
  const { breadName } = useParams();
  const [flourKg, setFlourKg] = useState(25);
  const [massaMadre, setMassaMadre] = useState(0);

  const recipe = useMemo(
    () => recipes.find((item) => item.name === decodeURIComponent(breadName || '')),
    [breadName],
  );

  if (!recipe) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="glass-card max-w-lg p-8 text-center">
          <h1 className="text-2xl font-semibold">Receita não encontrada</h1>
          <Link to="/" className="mt-4 inline-block rounded-xl bg-white/15 px-5 py-2 font-medium text-white transition hover:bg-white/25">
            Voltar para início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-100/80">Calculadora</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">{recipe.name}</h1>
        </div>
        <Link to="/" className="rounded-xl bg-white/15 px-5 py-2 font-medium text-white transition hover:bg-white/25">
          ← Trocar pão
        </Link>
      </div>

      <section className="glass-card mb-6 grid gap-5 p-6 md:grid-cols-2 md:p-8">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white/85">Quantidade de farinha ou pré-mistura (kg)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={flourKg}
            onChange={(event) => setFlourKg(Number(event.target.value) || 0)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-lg text-white outline-none transition focus:border-cyan-200/60"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/85">Massa madre (g)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={massaMadre}
            onChange={(event) => setMassaMadre(Number(event.target.value) || 0)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-lg text-white outline-none transition focus:border-cyan-200/60"
          />
        </label>
      </section>

      <Calculator recipe={recipe} flourKg={flourKg} massaMadre={massaMadre} />
    </main>
  );
}

export default CalculatorPage;
