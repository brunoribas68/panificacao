import { useNavigate } from 'react-router-dom';
import BreadCard from '../components/BreadCard';
import { recipes } from '../data/recipes';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-12 md:px-8">
      <div className="glass-card mx-auto w-full max-w-5xl p-6 md:p-10">
        <header className="mb-8 text-center md:mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-700/70">Panificação</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">Calculadora de Pães</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Escolha o pão no menu de cards e veja os cálculos em cards centralizados com visual glass.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((recipe) => (
            <BreadCard key={recipe.name} name={recipe.name} onSelect={() => navigate(`/calculator/${encodeURIComponent(recipe.name)}`)} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default Home;
