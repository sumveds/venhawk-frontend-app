import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Stepper Component
 * @description Individual step indicator with number and label
 */
const Stepper = ({
  stepNumber,
  label,
  isActive = false,
  isCompleted = false,
  className
}) => {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      {/* Step Circle */}
      <div
        className={clsx(
          'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200',
          'flex-shrink-0',
          isActive && 'bg-[#1a3a52] text-white',
          !isActive && !isCompleted && 'bg-gray-200 text-gray-600',
          isCompleted && 'bg-[#1a3a52] text-white'
        )}
      >
        {stepNumber}
      </div>

      {/* Step Label */}
      <span
        className={clsx(
          'text-sm md:text-base font-normal whitespace-nowrap',
          isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
        )}
      >
        {label}
      </span>
    </div>
  );
};

Stepper.propTypes = {
  stepNumber: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isCompleted: PropTypes.bool,
  className: PropTypes.string,
};

export default Stepper;
