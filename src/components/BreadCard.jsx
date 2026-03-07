import PropTypes from 'prop-types';

function BreadCard({ name, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="glass-card group relative overflow-hidden p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-2xl transition-all duration-500 group-hover:bg-cyan-300/35" />
      <h2 className="relative text-xl font-semibold tracking-tight text-white md:text-2xl">{name}</h2>
      <p className="relative mt-3 text-sm text-white/75">Abrir calculadora</p>
    </button>
  );
}

BreadCard.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BreadCard;
