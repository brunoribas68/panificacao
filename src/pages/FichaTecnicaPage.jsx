import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BREAD_WEIGHT = 300;
const SAL_PCT = 2;
const FERMENTO_PCT = 1.5;

function calcularHidratacao(percentualIntegral) {
  if (percentualIntegral <= 30) return [58, 62];
  if (percentualIntegral <= 70) return [60, 65];
  return [65, 75];
}

function calcularClassificacao(pctIntegral) {
  if (pctIntegral === 0) return 'Pão Branco';
  if (pctIntegral === 100) return 'Pão 100% Integral';
  if (pctIntegral <= 30) return `Pão com ${pctIntegral.toFixed(0)}% Integral`;
  if (pctIntegral <= 70) return `Pão ${pctIntegral.toFixed(0)}% Integral`;
  return `Pão de Alta Proporção Integral (${pctIntegral.toFixed(0)}%)`;
}

function calcularFichaTecnica(farinhaBranca, farinhaIntegral) {
  const totalFarinha = farinhaBranca + farinhaIntegral;
  if (totalFarinha === 0) return null;

  const pctIntegral = (farinhaIntegral / totalFarinha) * 100;
  const pctBranca = 100 - pctIntegral;

  const [hidMin, hidMax] = calcularHidratacao(pctIntegral);

  const aguaMin = totalFarinha * (hidMin / 100);
  const aguaMax = totalFarinha * (hidMax / 100);
  const sal = totalFarinha * (SAL_PCT / 100);
  const fermento = totalFarinha * (FERMENTO_PCT / 100);

  const totalMin = totalFarinha + aguaMin + sal + fermento;
  const totalMax = totalFarinha + aguaMax + sal + fermento;

  const rendimentoMin = Math.floor(totalMin / BREAD_WEIGHT);
  const rendimentoMax = Math.floor(totalMax / BREAD_WEIGHT);

  return {
    pctBranca,
    pctIntegral,
    farinhaBranca,
    farinhaIntegral,
    totalFarinha,
    hidMin,
    hidMax,
    aguaMin,
    aguaMax,
    sal,
    fermento,
    totalMin,
    totalMax,
    rendimentoMin,
    rendimentoMax,
    classificacao: calcularClassificacao(pctIntegral),
  };
}

function FichaTecnicaPage() {
  const [farinhaBrancaInput, setFarinhaBrancaInput] = useState('');
  const [farinhaIntegralInput, setFarinhaIntegralInput] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const handleCalcular = () => {
    const branca = Number(farinhaBrancaInput) || 0;
    const integral = Number(farinhaIntegralInput) || 0;

    if (branca === 0 && integral === 0) {
      setErro('Informe ao menos uma quantidade de farinha para calcular.');
      setResultado(null);
      return;
    }

    setErro('');
    setResultado(calcularFichaTecnica(branca, integral));
  };

  const handleInput = (setter) => (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setter(val);
    setResultado(null);
    setErro('');
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-10 md:px-8">
      <div className="w-full rounded-[2rem] border border-white/60 bg-white/40 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.15)] backdrop-blur-2xl md:p-8">
        <header className="relative mb-6 text-center">
          <Link
            to="/"
            className="absolute left-0 top-0 rounded-xl border border-white/60 bg-white/60 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-white/80"
          >
            ← Voltar
          </Link>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-700/70">Porcentagem de Padeiro</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">Ficha Técnica de Pão Integral</h1>
        </header>

        <section className="glass-card p-6 md:p-8">
          <h2 className="text-base font-semibold text-slate-800">Informe as quantidades de farinha</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Farinha de trigo branca (g)</span>
              <input
                type="text"
                inputMode="numeric"
                value={farinhaBrancaInput}
                onChange={handleInput(setFarinhaBrancaInput)}
                placeholder="Ex: 600"
                className="input-glass"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Farinha integral (g)</span>
              <input
                type="text"
                inputMode="numeric"
                value={farinhaIntegralInput}
                onChange={handleInput(setFarinhaIntegralInput)}
                placeholder="Ex: 400"
                className="input-glass"
              />
            </label>
          </div>

          {erro && (
            <p className="mt-3 rounded-xl border border-red-200 bg-red-50/70 px-3 py-2 text-sm text-red-700">{erro}</p>
          )}

          <button
            type="button"
            onClick={handleCalcular}
            className="mt-5 rounded-xl bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Gerar Ficha Técnica
          </button>
        </section>

        {resultado && <FichaTecnica resultado={resultado} />}
      </div>
    </main>
  );
}

function FichaTecnica({ resultado }) {
  const {
    pctBranca,
    pctIntegral,
    farinhaBranca,
    farinhaIntegral,
    totalFarinha,
    hidMin,
    hidMax,
    aguaMin,
    aguaMax,
    sal,
    fermento,
    totalMin,
    totalMax,
    rendimentoMin,
    rendimentoMax,
    classificacao,
  } = resultado;

  const isSingleRendimento = rendimentoMin === rendimentoMax;

  return (
    <div className="mt-6 space-y-5">
      <div className="glass-card overflow-hidden p-0">
        <div className="bg-amber-50/70 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700/70">Classificação</p>
          <h2 className="mt-1 text-2xl font-extrabold text-amber-900">{classificacao}</h2>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Ingredientes — Porcentagem de Padeiro
          </h3>

          <ul className="mt-3 space-y-2">
            {pctBranca > 0 && (
              <IngredientRow
                label="Farinha de trigo branca"
                percent={`${pctBranca.toFixed(1)}%`}
                value={`${farinhaBranca.toFixed(0)} g`}
              />
            )}
            {pctIntegral > 0 && (
              <IngredientRow
                label="Farinha integral"
                percent={`${pctIntegral.toFixed(1)}%`}
                value={`${farinhaIntegral.toFixed(0)} g`}
                highlight
              />
            )}
            <IngredientRow
              label="Água"
              percent={`${hidMin}% – ${hidMax}%`}
              value={`${aguaMin.toFixed(0)} g – ${aguaMax.toFixed(0)} g`}
              isRange
            />
            <IngredientRow
              label="Sal"
              percent={`${SAL_PCT}%`}
              value={`${sal.toFixed(1)} g`}
            />
            <IngredientRow
              label="Fermento biológico seco"
              percent={`${FERMENTO_PCT}%`}
              value={`${fermento.toFixed(1)} g`}
            />
          </ul>

          <p className="mt-3 text-xs text-slate-400">
            * Percentuais calculados sobre o total de farinha ({totalFarinha.toFixed(0)} g = 100%)
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Faixa de hidratação"
          value={`${hidMin}% – ${hidMax}%`}
          sub="de água sobre a farinha"
        />
        <StatCard
          label="Peso total estimado"
          value={`${totalMin.toFixed(0)} g – ${totalMax.toFixed(0)} g`}
          sub="dependendo da hidratação"
        />
        <StatCard
          label="Rendimento"
          value={isSingleRendimento ? `${rendimentoMin} pães` : `${rendimentoMin} – ${rendimentoMax} pães`}
          sub={`divisão em peças de ${BREAD_WEIGHT} g`}
        />
      </div>

      <div className="glass-card p-6 md:p-8">
        <h3 className="text-base font-semibold text-slate-800">Modo de preparo</h3>
        <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-700">
          {buildInstructions(pctIntegral).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-amber-300/50 bg-amber-50/60 px-5 py-4 text-sm font-medium text-amber-900">
        Este pão possui <strong>{pctIntegral.toFixed(1)}%</strong> de farinha integral.
      </div>
    </div>
  );
}

function buildInstructions(pctIntegral) {
  const steps = [
    'Misture as farinhas (branca e integral) até homogeneizar bem.',
    'Adicione o sal e o fermento biológico seco aos ingredientes secos.',
    `Acrescente a água gradualmente, iniciando com ${pctIntegral <= 30 ? '58%' : pctIntegral <= 70 ? '60%' : '65%'} e ajustando conforme a absorção da farinha.`,
    'Sove a massa em bancada por 10 a 15 minutos ou em batedeira planetária por 8 minutos em velocidade média até atingir o ponto de véu.',
    pctIntegral >= 70
      ? 'Atenção: farinhas de alta proporção integral absorvem mais água e resultam em massa mais densa. Ajuste a hidratação com cuidado para não ressecar a massa.'
      : pctIntegral >= 30
        ? 'A presença de farinha integral exige uma hidratação ligeiramente maior. Observe a textura da massa e ajuste se necessário.'
        : 'Com baixo percentual integral, a massa se comporta próxima a uma massa branca convencional.',
    'Cubra a massa com filme plástico ou pano úmido e deixe fermentar em bloco por 60 a 90 minutos à temperatura ambiente, até dobrar de volume (primeira fermentação).',
    `Divida a massa em peças de ${BREAD_WEIGHT} g.`,
    'Boleie cada peça com movimentos firmes e circulares, formando tensão superficial.',
    'Modele os pães no formato desejado.',
    'Deixe fermentar novamente por 30 a 60 minutos (segunda fermentação ou apretto).',
    'Asse em forno pré-aquecido a 200°C. Se possível, use vapor nos primeiros 10 minutos para obter casca crocante.',
    'Retire do forno quando a casca estiver dourada e o pão soar oco ao bater na base.',
  ];

  return steps;
}

function IngredientRow({ label, percent, value, highlight, isRange }) {
  return (
    <li
      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm ${
        highlight
          ? 'border border-amber-200/60 bg-amber-50/70 text-amber-900'
          : isRange
            ? 'bg-sky-50/60 text-slate-800'
            : 'bg-white/70 text-slate-700'
      }`}
    >
      <span>{label} <span className="text-xs font-medium opacity-60">({percent})</span></span>
      <span className="font-semibold">{value}</span>
    </li>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <article className="glass-card p-5 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </article>
  );
}

FichaTecnica.propTypes = {
  resultado: PropTypes.shape({
    pctBranca: PropTypes.number.isRequired,
    pctIntegral: PropTypes.number.isRequired,
    farinhaBranca: PropTypes.number.isRequired,
    farinhaIntegral: PropTypes.number.isRequired,
    totalFarinha: PropTypes.number.isRequired,
    hidMin: PropTypes.number.isRequired,
    hidMax: PropTypes.number.isRequired,
    aguaMin: PropTypes.number.isRequired,
    aguaMax: PropTypes.number.isRequired,
    sal: PropTypes.number.isRequired,
    fermento: PropTypes.number.isRequired,
    totalMin: PropTypes.number.isRequired,
    totalMax: PropTypes.number.isRequired,
    rendimentoMin: PropTypes.number.isRequired,
    rendimentoMax: PropTypes.number.isRequired,
    classificacao: PropTypes.string.isRequired,
  }).isRequired,
};

IngredientRow.propTypes = {
  label: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
  isRange: PropTypes.bool,
};

IngredientRow.defaultProps = {
  highlight: false,
  isRange: false,
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
};

export default FichaTecnicaPage;
