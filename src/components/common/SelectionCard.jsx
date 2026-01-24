import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * SelectionCard Component
 * @description Large selectable card for options like "Upload Document" or "Answer Questionnaire"
 */
const SelectionCard = ({
  icon,
  title,
  description,
  selected = false,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full p-8 border-2 rounded-xl transition-all duration-200',
        'flex flex-col items-center text-center',
        'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        selected
          ? 'border-[#1a3a52] bg-blue-50'
          : 'border-gray-300 bg-white',
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="w-16 h-16 mb-4 text-gray-600">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600">
          {description}
        </p>
      )}
    </button>
  );
};

SelectionCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectionCard;
