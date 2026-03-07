import PropTypes from 'prop-types';
import BreadCard from './BreadCard';

function BreadMenu({ breads, selectedBreadId, onSelectBread, menuTitle }) {
  return (
    <aside className="glass-card h-full p-5 md:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{menuTitle}</h2>
      <div className="mt-4 grid max-h-[580px] grid-cols-2 gap-3 overflow-y-auto pr-1 md:grid-cols-2 lg:grid-cols-3">
        {breads.map((bread) => (
          <BreadCard key={bread.id} bread={bread} isSelected={selectedBreadId === bread.id} onSelect={onSelectBread} />
        ))}
      </div>
    </aside>
  );
}

BreadMenu.propTypes = {
  breads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedBreadId: PropTypes.string.isRequired,
  onSelectBread: PropTypes.func.isRequired,
  menuTitle: PropTypes.string.isRequired,
};

export default BreadMenu;
