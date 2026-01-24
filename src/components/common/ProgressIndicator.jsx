import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from './Stepper';

/**
 * ProgressIndicator Component
 * @description Multi-step progress indicator for forms
 */
const ProgressIndicator = ({ steps = [], currentStep = 0, className }) => {
  return (
    <div className={clsx('w-full py-4', className)}>
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <Stepper
              key={index}
              stepNumber={index + 1}
              label={step.label}
              isActive={isActive}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </div>
  );
};

ProgressIndicator.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentStep: PropTypes.number,
  className: PropTypes.string,
};

export default ProgressIndicator;
