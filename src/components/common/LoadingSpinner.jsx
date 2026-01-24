import PropTypes from 'prop-types';

/**
 * LoadingSpinner Component
 * @description Elegant and modern loading spinner with multiple sizes
 */
const LoadingSpinner = ({ size = 'medium', fullScreen = false, message = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-500 animate-spin"></div>
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 rounded-full bg-blue-50 animate-pulse"></div>
      </div>
      {message && (
        <p className="text-sm text-gray-600 font-medium animate-pulse">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullScreen: PropTypes.bool,
  message: PropTypes.string,
};

export default LoadingSpinner;
