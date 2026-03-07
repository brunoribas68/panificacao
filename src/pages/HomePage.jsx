import { useMemo, useState } from 'react';
import BreadMenu from '../components/BreadMenu';
import RecipePanel from '../components/RecipePanel';
import { recipes } from '../data/recipes';

function HomePage() {
  const [selectedBreadId, setSelectedBreadId] = useState(recipes[0].id);

  const selectedBread = useMemo(
    () => recipes.find((bread) => bread.id === selectedBreadId) || recipes[0],
    [selectedBreadId],
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 md:px-8">
      <div className="w-full rounded-[2rem] border border-white/60 bg-white/40 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl md:p-6">
        <header className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-700/70">Panificação Calculator</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-5xl">Selecione um pão e veja a ficha técnica</h1>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <BreadMenu breads={recipes} selectedBreadId={selectedBreadId} onSelectBread={setSelectedBreadId} />
          <RecipePanel bread={selectedBread} />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
