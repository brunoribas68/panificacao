import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { ingredientTranslations, translateBreadName, translations } from '../i18n/translations';

const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

function calcular(recipe, flourGrams, massaMadreGrams) {
  const fg = flourGrams > 0 ? flourGrams : 0;
  const mm = massaMadreGrams > 0 ? massaMadreGrams : 0;

  if (!recipe || fg === 0) {
    return { ingredients: {}, totalDough: mm, breads: 0, leftoverDough: mm };
  }

  const ingredients = {};
  Object.entries(recipe.ingredients).forEach(([name, percent]) => {
    if (name === 'farinha') return;
    if (Array.isArray(percent)) {
      ingredients[name] = { isRange: true, percent, min: fg * (percent[0] / 100), max: fg * (percent[1] / 100) };
    } else {
      ingredients[name] = { isRange: false, percent, grams: fg * (percent / 100) };
    }
  });

  const ingredientSum = Object.values(ingredients).reduce(
    (sum, ing) => sum + (ing.isRange ? ing.max : ing.grams),
    0,
  );

  const totalDough = fg + ingredientSum + mm;
  const breads = recipe.breadWeight > 0 ? Math.floor(totalDough / recipe.breadWeight) : 0;
  const leftoverDough = recipe.breadWeight > 0 ? totalDough % recipe.breadWeight : 0;

  return { ingredients, totalDough, breads, leftoverDough };
}

function HomePage() {
  const [selectedBreadId, setSelectedBreadId] = useState(recipes[0].id);
  const [flourInput, setFlourInput] = useState('20000');
  const [massaMadreInput, setMassaMadreInput] = useState('0');
  const [language, setLanguage] = useState('pt');

  const t = translations[language] || translations.pt;
  const ingredientLabels = ingredientTranslations[language] || ingredientTranslations.pt;

  const localizedBreads = useMemo(
    () => recipes.map((b) => ({ ...b, name: translateBreadName(b, language) })),
    [language],
  );

  const selectedBread = useMemo(
    () => recipes.find((b) => b.id === selectedBreadId) || recipes[0],
    [selectedBreadId],
  );

  const flourGrams = useMemo(() => {
    const v = Number(flourInput);
    return Number.isFinite(v) && v > 0 ? v : 0;
  }, [flourInput]);

  const massaMadreGrams = useMemo(() => {
    const v = Number(massaMadreInput);
    return Number.isFinite(v) && v > 0 ? v : 0;
  }, [massaMadreInput]);

  const calc = useMemo(
    () => calcular(selectedBread, flourGrams, massaMadreGrams),
    [selectedBread, flourGrams, massaMadreGrams],
  );

  const handleNumericInput = (setter) => (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 md:grid md:grid-cols-2 md:grid-rows-2">

      {/* TOP / Desktop Left-Top: Inputs */}
      <section className="flex-none border-b border-slate-200 bg-white px-4 pb-3 pt-3 md:col-start-1 md:row-start-1 md:overflow-y-auto md:border-b-0 md:border-r">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                aria-label={lang.label}
                onClick={() => setLanguage(lang.code)}
                className={`rounded-lg px-2 py-1 text-lg transition ${
                  language === lang.code ? 'bg-sky-100 ring-1 ring-sky-300' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>
          <Link
            to="/ficha-tecnica-integral"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800"
          >
            🌾 Ficha Integral
          </Link>
        </div>

        <select
          value={selectedBreadId}
          onChange={(e) => setSelectedBreadId(e.target.value)}
          className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {localizedBreads.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.flour} (g)</span>
            <input
              type="text"
              inputMode="numeric"
              value={flourInput}
              onChange={handleNumericInput(setFlourInput)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.massaMadre} (g)</span>
            <input
              type="text"
              inputMode="numeric"
              value={massaMadreInput}
              onChange={handleNumericInput(setMassaMadreInput)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </label>
        </div>
      </section>

      {/* MIDDLE / Desktop Right: Main Results */}
      <section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-sky-600 px-4 py-4 md:col-start-2 md:row-start-1 md:row-span-2">
        <div className="text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">{t.totalDough}</p>
          <p className="mt-1 text-5xl font-black leading-none">
            {calc.totalDough.toFixed(0)}
            <span className="ml-1 text-2xl font-semibold opacity-80">g</span>
          </p>
        </div>

        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/20 px-3 py-3 text-center text-white backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{t.breadsProduced}</p>
            <p className="mt-1 text-3xl font-extrabold">{calc.breads}</p>
          </div>
          <div className="rounded-2xl bg-white/20 px-3 py-3 text-center text-white backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{t.divisionPerBread}</p>
            <p className="mt-1 text-3xl font-extrabold">{selectedBread.breadWeight} g</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-white/20 px-3 py-2.5 text-center text-white backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{t.leftoverDough}</p>
            <p className="mt-0.5 text-2xl font-bold">{calc.leftoverDough.toFixed(0)} g</p>
          </div>
        </div>
      </section>

      {/* BOTTOM / Desktop Left-Bottom: Ingredients */}
      <section className="flex-none border-t border-slate-200 bg-white px-4 pb-3 pt-2.5 md:col-start-1 md:row-start-2 md:overflow-y-auto md:border-r md:border-t">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">{t.ingredients}</p>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
            <span className="text-xs text-slate-600">{ingredientLabels.farinha || 'Farinha'}</span>
            <span className="text-xs font-bold text-slate-900">{flourGrams.toFixed(0)} g</span>
          </div>
          {Object.entries(calc.ingredients).map(([name, ing]) => (
            <div key={name} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
              <span className="text-xs text-slate-600">{ingredientLabels[name] || name}</span>
              <span className="text-xs font-bold text-slate-900">
                {ing.isRange
                  ? `${ing.min.toFixed(0)}–${ing.max.toFixed(0)} g`
                  : `${ing.grams.toFixed(0)} g`}
              </span>
            </div>
          ))}
          {massaMadreGrams > 0 && (
            <div className="flex items-center justify-between rounded-lg bg-cyan-50 px-2.5 py-1.5">
              <span className="text-xs text-cyan-700">{t.massaMadre}</span>
              <span className="text-xs font-bold text-cyan-900">{massaMadreGrams.toFixed(0)} g</span>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default HomePage;
