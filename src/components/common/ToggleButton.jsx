import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * ToggleButton Component
 * @description Toggle switch component for boolean values
 */
const ToggleButton = ({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  className,
  ...rest
}) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        name={name}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2',
          checked ? 'bg-navy-500' : 'bg-gray-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        {...rest}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>

      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
    </div>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ToggleButton;
