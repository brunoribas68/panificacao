import PropTypes from 'prop-types';

function BreadCard({ name, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="glass-card group relative overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/70"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-200/40 blur-2xl transition-all duration-500 group-hover:bg-cyan-200/70" />
      <h2 className="relative text-lg font-semibold tracking-tight text-slate-800 md:text-xl">{name}</h2>
      <p className="relative mt-3 text-sm text-slate-500">Abrir calculadora</p>
    </button>
  );
}

BreadCard.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BreadCard;
