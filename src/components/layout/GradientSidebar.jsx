import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * GradientSidebar Component
 * @description Sidebar with gradient background for forms and content
 */
const GradientSidebar = ({ children, className }) => {
  return (
    <aside
      className={clsx(
        'gradient-navy min-h-screen p-8 text-white',
        'flex flex-col justify-center',
        className
      )}
    >
      <div className="max-w-md">
        {children}
      </div>
    </aside>
  );
};

GradientSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default GradientSidebar;
