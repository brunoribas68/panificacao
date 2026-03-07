import PropTypes from 'prop-types';

function BreadCard({ bread, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(bread.id)}
      className={`group w-full rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isSelected
          ? 'border-cyan-200/90 bg-white/80 shadow-[0_20px_45px_rgba(56,189,248,0.25)]'
          : 'border-white/60 bg-white/55 hover:border-white/90 hover:bg-white/75'
      }`}
    >
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/70 shadow-inner shadow-slate-200/60">
        <img src={bread.image} alt={bread.name} className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105" />
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-800 md:text-base">{bread.name}</p>
    </button>
  );
}

BreadCard.propTypes = {
  bread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BreadCard;
