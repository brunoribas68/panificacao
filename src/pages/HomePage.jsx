import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { calculateFlourFactor, calculateIngredients } from '../domain/calculations';
import { ingredientTranslations, translateBreadName, translateInstruction, translations } from '../i18n/translations';
import {
  clampGrams,
  MAX_GRAMS_INPUT,
  parseNonNegativeDecimal,
  parseNonNegativeInteger,
  sanitizeDecimalInput,
  sanitizeIntegerInput,
} from '../utils/numberInput';

const LANGUAGES = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

function HomePage() {
  const [selectedBreadId, setSelectedBreadId] = useState(recipes[0].id);
  const [flourInput, setFlourInput] = useState('20000');
  const [massaMadreInput, setMassaMadreInput] = useState('0');
  const [targetBreadsInput, setTargetBreadsInput] = useState('');
  const [language, setLanguage] = useState('pt');
  const [showInstructions, setShowInstructions] = useState(false);

  const t = translations[language] || translations.pt;
  const ingredientLabels = ingredientTranslations[language] || ingredientTranslations.pt;

  const localizedBreads = useMemo(
    () => recipes.map((bread) => ({ ...bread, name: translateBreadName(bread, language) })),
    [language],
  );

  const selectedBread = useMemo(
    () => recipes.find((bread) => bread.id === selectedBreadId) || recipes[0],
    [selectedBreadId],
  );

  const flourValue = useMemo(() => parseNonNegativeDecimal(flourInput), [flourInput]);
  const massaMadreValue = useMemo(() => parseNonNegativeDecimal(massaMadreInput), [massaMadreInput]);
  const targetBreadsValue = useMemo(() => parseNonNegativeInteger(targetBreadsInput), [targetBreadsInput]);

  const flourGrams = flourValue ?? 0;
  const massaMadreGrams = massaMadreValue ?? 0;

  const flourInvalid = flourInput.trim() !== '' && flourValue == null;
  const massaMadreInvalid = massaMadreInput.trim() !== '' && massaMadreValue == null;
  const targetBreadsInvalid = targetBreadsInput.trim() !== '' && targetBreadsValue == null;
  const maxFlourExceeded = flourValue != null && flourValue > MAX_GRAMS_INPUT;
  const maxMassaMadreExceeded = massaMadreValue != null && massaMadreValue > MAX_GRAMS_INPUT;

  const calc = useMemo(
    () => calculateIngredients(selectedBread, flourGrams, massaMadreGrams),
    [selectedBread, flourGrams, massaMadreGrams],
  );

  const hasInputErrors = flourInvalid || massaMadreInvalid || targetBreadsInvalid;

  useEffect(() => {
    if (targetBreadsValue == null || targetBreadsValue <= 0 || !selectedBread) {
      return;
    }

    const flourFactor = calculateFlourFactor(selectedBread);
    const requiredTotalDough = targetBreadsValue * selectedBread.breadWeight;
    const requiredFlour = Math.max(0, Math.ceil((requiredTotalDough - massaMadreGrams) / flourFactor));
    setFlourInput(String(clampGrams(requiredFlour)));
  }, [targetBreadsValue, selectedBread, massaMadreGrams]);

  const handleFlourInputChange = (event) => {
    setFlourInput(sanitizeDecimalInput(event.target.value));
    setTargetBreadsInput('');
  };

  const handleMassaMadreInputChange = (event) => {
    setMassaMadreInput(sanitizeDecimalInput(event.target.value));
  };

  const handleTargetBreadsInputChange = (event) => {
    setTargetBreadsInput(sanitizeIntegerInput(event.target.value));
  };

  const applyMaxIfExceeded = (fieldName) => {
    if (fieldName === 'flour' && maxFlourExceeded) {
      setFlourInput(String(MAX_GRAMS_INPUT));
    }

    if (fieldName === 'massaMadre' && maxMassaMadreExceeded) {
      setMassaMadreInput(String(MAX_GRAMS_INPUT));
    }
  };

  return (
    <>
      <div className="flex min-h-dvh flex-col bg-slate-50 md:h-screen md:grid md:grid-cols-2 md:grid-rows-2 md:overflow-hidden">

        <section className="flex-none border-b border-slate-200 bg-white px-4 pb-3 pt-3 md:col-start-1 md:row-start-1 md:overflow-y-auto md:border-b-0 md:border-r">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex gap-1" role="group" aria-label={t.languageSelector}>
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
              🌾 {t.integralSheetLink}
            </Link>
          </div>

          <label htmlFor="bread-select" className="sr-only">{t.breadSelectorLabel}</label>
          <select
            id="bread-select"
            value={selectedBreadId}
            onChange={(event) => setSelectedBreadId(event.target.value)}
            className="mb-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-base font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {localizedBreads.map((bread) => (
              <option key={bread.id} value={bread.id}>{bread.name}</option>
            ))}
          </select>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <label className="flex flex-col gap-1" htmlFor="flour-input">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.flour} (g)</span>
              <input
                id="flour-input"
                type="text"
                inputMode="decimal"
                value={flourInput}
                onChange={handleFlourInputChange}
                onBlur={() => applyMaxIfExceeded('flour')}
                aria-invalid={flourInvalid || maxFlourExceeded}
                aria-describedby="flour-help"
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="massa-madre-input">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.massaMadre} (g)</span>
              <input
                id="massa-madre-input"
                type="text"
                inputMode="decimal"
                value={massaMadreInput}
                onChange={handleMassaMadreInputChange}
                onBlur={() => applyMaxIfExceeded('massaMadre')}
                aria-invalid={massaMadreInvalid || maxMassaMadreExceeded}
                aria-describedby="massa-madre-help"
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </label>
            <label className="flex flex-col gap-1" htmlFor="target-breads-input">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.targetBreads}</span>
              <input
                id="target-breads-input"
                type="text"
                inputMode="numeric"
                value={targetBreadsInput}
                onChange={handleTargetBreadsInputChange}
                aria-invalid={targetBreadsInvalid}
                aria-describedby="target-breads-help"
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xl font-bold text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </label>
          </div>

          <div className="mt-2 text-xs text-slate-500" id="flour-help">{t.maxValueNotice}: {MAX_GRAMS_INPUT} g</div>
          <div className="sr-only" id="massa-madre-help">{t.maxValueNotice}: {MAX_GRAMS_INPUT} g</div>
          <div className="sr-only" id="target-breads-help">{t.targetBreadsHelp}</div>

          {hasInputErrors && (
            <p className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700" role="alert" aria-live="assertive">
              {t.invalidNumber}
            </p>
          )}
          {(maxFlourExceeded || maxMassaMadreExceeded) && (
            <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800" role="status" aria-live="polite">
              {t.maxValueApplied}
            </p>
          )}
        </section>

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

          <button
            type="button"
            onClick={() => setShowInstructions(true)}
            className="mt-1 flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30 active:bg-white/40"
            aria-label={t.openPreparationMode}
          >
            📋 {t.preparationMode}
          </button>
        </section>

        <section className="flex-none border-t border-slate-200 bg-white px-4 pb-3 pt-2.5 md:col-start-1 md:row-start-2 md:overflow-y-auto md:border-r md:border-t">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">{t.ingredients}</p>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
              <span className="text-xs text-slate-600">{ingredientLabels.farinha || 'Farinha'}</span>
              <span className="text-xs font-bold text-slate-900">{flourGrams.toFixed(0)} g</span>
            </div>
            {Object.entries(calc.ingredients).map(([name, ingredient]) => (
              <div key={name} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-1.5">
                <span className="text-xs text-slate-600">{ingredientLabels[name] || name}</span>
                <span className="text-xs font-bold text-slate-900">
                  {ingredient.isRange
                    ? `${ingredient.min.toFixed(0)}–${ingredient.max.toFixed(0)} g`
                    : `${ingredient.grams.toFixed(0)} g`}
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

      {showInstructions && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="instructions-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl md:max-h-[80vh] md:rounded-3xl md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="instructions-title" className="text-sm font-bold leading-snug text-slate-900 md:text-base">{t.preparationMode} — {translateBreadName(selectedBread, language)}</h2>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200"
                aria-label={t.closeDialog}
              >
                ✕
              </button>
            </div>
            <ol className="space-y-3">
              {selectedBread.instructions.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{translateInstruction(step, language)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
