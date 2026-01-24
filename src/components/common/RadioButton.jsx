import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * RadioButton Component
 * @description Radio button group for Yes/No or multiple choice selections
 */
const RadioButton = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className,
  inline = true,
  ...rest
}) => {
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-normal text-gray-700 mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={clsx('flex gap-3', inline ? 'flex-row' : 'flex-col')}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <label
              key={option.value}
              className={clsx(
                'flex items-center cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={disabled}
                onClick={() => !disabled && onChange(option.value)}
                className={clsx(
                  'w-16 h-10 rounded-full border-2 transition-all duration-200',
                  'flex items-center justify-center font-medium text-sm',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isSelected
                    ? 'bg-[#1a3a52] border-[#1a3a52] text-white focus:ring-[#1a3a52]'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-gray-400',
                  disabled && 'cursor-not-allowed'
                )}
                {...rest}
              >
                {option.label}
              </button>
            </label>
          );
        })}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inline: PropTypes.bool,
};

export default RadioButton;
