import { useMemo, useState } from 'react';
import BreadMenu from '../components/BreadMenu';
import RecipePanel from '../components/RecipePanel';
import { recipes } from '../data/recipes';
import { translateBreadName, translations } from '../i18n/translations';

const languages = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

function HomePage() {
  const [selectedBreadId, setSelectedBreadId] = useState(recipes[0].id);
  const [language, setLanguage] = useState('pt');

  const selectedBread = useMemo(
    () => recipes.find((bread) => bread.id === selectedBreadId) || recipes[0],
    [selectedBreadId],
  );

  const t = translations[language] || translations.pt;

  const localizedBreads = useMemo(
    () => recipes.map((bread) => ({ ...bread, name: translateBreadName(bread, language) })),
    [language],
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 md:px-8">
      <div className="w-full rounded-[2rem] border border-white/60 bg-white/40 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl md:p-6">
        <header className="relative mb-6 text-center">
          <div className="absolute right-0 top-0 flex gap-2">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                aria-label={item.label}
                title={item.label}
                onClick={() => setLanguage(item.code)}
                className={`rounded-lg border px-2 py-1 text-xl transition ${
                  language === item.code
                    ? 'border-sky-300 bg-white/90 shadow'
                    : 'border-white/60 bg-white/60 hover:bg-white/80'
                }`}
              >
                {item.flag}
              </button>
            ))}
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-700/70">{t.appSubtitle}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-5xl">{t.appTitle}</h1>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <BreadMenu
            breads={localizedBreads}
            selectedBreadId={selectedBreadId}
            onSelectBread={setSelectedBreadId}
            menuTitle={t.menuBreads}
          />
          <RecipePanel bread={selectedBread} language={language} />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
