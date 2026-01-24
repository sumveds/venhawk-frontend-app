import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Avatar Component
 * @description User avatar with image or initials fallback
 */
const Avatar = ({
  src,
  alt,
  name,
  size = 'medium',
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-xl',
    xlarge: 'w-24 h-24 text-2xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const showImage = src && !imageError;

  return (
    <div
      className={clsx(
        'rounded-full overflow-hidden flex items-center justify-center bg-blue-600 text-white font-semibold',
        sizeStyles[size],
        className
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="w-full h-full object-cover"
          onError={handleImageError}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  className: PropTypes.string,
};

export default Avatar;
