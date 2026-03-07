import { useNavigate } from 'react-router-dom';
import BreadCard from '../components/BreadCard';
import { recipes } from '../data/recipes';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-12 md:px-8">
      <header className="mb-10 text-center md:mb-14">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Panificação</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-6xl">Calculadora de Pães</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/75 md:text-lg">
          Selecione um tipo de pão para calcular ingredientes com base em porcentagem do padeiro.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <BreadCard key={recipe.name} name={recipe.name} onSelect={() => navigate(`/calculator/${encodeURIComponent(recipe.name)}`)} />
        ))}
      </section>
    </main>
  );
}

export default Home;
